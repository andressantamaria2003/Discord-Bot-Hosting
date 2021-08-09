const Discord = require("discord.js")
const settings = require("../settings.json")
const node = require('nodeactyl')
const sql = require("sqlite")
const { MessageButton, MessageActionRow, MessageMenu, MessageMenuOption } = require('discord-buttons');
const { Client, MessageEmbed }  = require('discord.js');
let encendido = false

sql.open("./users.sqlite")
module.exports = {
  name: 'servers'
  , aliases: []
  , guildOnly: true
  , group: 'control'
  , description: `Get a full list of servers in your pterodactyl panel`
  , clientPermissions: [
    'EMBED_LINKS'
  ]
  , examples: ['servers']
  , parameters: []
  , run: async ( client, message, args) => {
    let user = message.mentions.users.first();
        if (!encendido) {
            client.on('clickMenu', async (menu) => {
                if(menu.clicker.user===message.author){
                    if(menu.id==="menuservers"){
                        global.serversel=menu.values[0]
                        menu.reply.defer(console.log(`se ha seleccionado el server ${serversel}`));
                        sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
                            if (!row) {
                                const user = message.author.username
                                message.channel.send(client.noperm(user))
                            } else {
                                const Client = new node.NodeactylClient(settings.panelURL, row.token);
                                console.log("1")
                                Client.getServerStatus(serversel).then((response) => {
                                    const respuesta1 = response
                                    console.log(respuesta1)
                                    if (respuesta1=="running"){
                                        respuesta="Encendido"
                                        color1="#4DFF00"
                                    } else if (respuesta1=="starting"){
                                        respuesta="Iniciando"
                                        color1="#FFB600"
                                    } else if (respuesta1=="powered off"){
                                        respuesta="Apagado"
                                        color1="#FF0000"
                                    }
                                    Client.  getServerUsages(serversel).then((response) => {
                                        const recursos = response.resources
                                        const embed = new Discord.MessageEmbed()
                                            .setTitle("Estado")
                                            .setColor(color1)
                                            .setDescription(`**Estado:** ${respuesta}\n**RAM:** ${(recursos.memory_bytes/1000000000).toFixed(2)} GB \n**Disco Duro:** ${(recursos.disk_bytes/1000000000).toFixed(2)} GB`)
                                            .setTimestamp()
                                            .setFooter(settings.embed.footer, settings.photourl);
                                        message.channel.send(embed).then(embedstatus => {
                                            embedstatus.delete({ timeout: 15000 })
                                        })
                                    }).catch((error) => {
                                        message.channel.send(client.embederror(error))
                                    })
                                });
                            };
                        });
                        let start = new MessageMenuOption()
                        .setLabel("Iniciar")
                        .setEmoji('🖥️')
                        .setValue("start")
                        let restart = new MessageMenuOption()
                        .setLabel("Reiniciar")
                        .setEmoji('🔄')
                        .setValue("restart")
                        let stop = new MessageMenuOption()
                        .setLabel("Detener")
                        .setEmoji('🛑')
                        .setValue("stop")
                        let kill = new MessageMenuOption()
                        .setLabel("Matar")
                        .setEmoji('☠️')
                        .setValue("kill")
                        let partialsubuser = new MessageMenuOption()
                        .setLabel("Dar Permisos Parciales")
                        .setEmoji('🧑🏾‍🤝‍🧑🏼')
                        .setValue("partialsubuser")
                        let totalsubuser = new MessageMenuOption()
                        .setLabel("Dar Permisos Totales")
                        .setEmoji('🧑🏻‍🤝‍🧑🏻')
                        .setValue("totalsubuser")
                        global.actionmenu = new MessageMenu()
                        actionmenu.setMaxValues(1)
                        actionmenu.setMinValues(1)
                        actionmenu.setID('actionmenu')
                        actionmenu.setPlaceholder('Select an option')
                        actionmenu.addOptions(start,restart,stop,kill,partialsubuser,totalsubuser)
                        let listbackup = new MessageMenuOption()
                        .setLabel("Listar Backups")
                        .setEmoji('📋')
                        .setValue("listbackup")
                        let createbackup = new MessageMenuOption()
                        .setLabel("Crear Backup")
                        .setEmoji('➕')
                        .setValue("createbackup")
                        let dwbackup = new MessageMenuOption()
                        .setLabel("Descargar Backup")
                        .setEmoji('871351680577445918')
                        .setValue("dwbackup")
                        global.backupmenu = new MessageMenu()
                        backupmenu.setMaxValues(1)
                        backupmenu.setMinValues(1)
                        backupmenu.setID('backupmenu')
                        backupmenu.setPlaceholder('Select an option')
                        backupmenu.addOptions(createbackup,listbackup,dwbackup)
                        const actionembed = new Discord.MessageEmbed()
                            .setTitle("Acciones de Energia")
                            .setColor(settings.embed.color.default)
                            .setDescription(`**En este menu puedes elegir acciones de energia:**\`\n 🛑 Apagar 🛑\n 🖥️ Encender 🖥️ \n 🔄 Reiniciar 🔄 \n ☠️ Matar ☠️\``)
                            .setTimestamp()
                            .setFooter(settings.embed.footer, settings.photourl);
                        message.channel.send(actionembed, actionmenu).then(menuacction => {
                            menuacction.delete({ timeout: 15000 })
                        })
                        const backupembed = new Discord.MessageEmbed()
                        .setTitle("Acciones de Backups")
                        .setColor(settings.embed.color.default)
                        .setDescription(`**En este menu puedes elegir acciones de backup:**\`\n📋 Listar BackUPs 📋\n➕ Crear Backup ➕\n⏬ Descargar Backup ⏬ \``)
                        .setTimestamp()
                        .setFooter(settings.embed.footer, settings.photourl);
                        message.channel.send(backupembed, backupmenu).then(menubackup => {
                            menubackup.delete({ timeout: 15000 })
                        })
                    }else if(menu.id==="actionmenu"){
                            console.log(serversel)
                            if(menu.clicker.user===message.author){
                                if (menu.values[0]==="start"){
                                    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
                                        if (!row) {
                                            const user = message.author.username
                                            message.channel.send(client.noperm(user))
                                        } else {
                                            const Client = new node.NodeactylClient(settings.panelURL, row.token);
                                            Client.startServer(serversel).then((response) => {
                                                const embed = new Discord.MessageEmbed()
                                                    .setTitle("Se esta iniciando tu servidor <a:loading1:825155406703624252> ")
                                                    .setColor(settings.embed.color.default)
                                                    .setTimestamp()
                                                    .setFooter(settings.embed.footer, settings.photourl);
                                                menu.reply.send(embed, true);
                                            }).catch((error) => {
                                                message.channel.send(client.embederror(error))
                                            });
                                        }
                        
                                    })
                                }else if (menu.values[0]==="restart"){
                                    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
                                        if (!row) {
                                            const user = message.author.username
                                            message.channel.send(client.noperm(user))
                                        } else {
                                            const Client = new node.NodeactylClient(settings.panelURL, row.token);
                                            Client.restartServer(serversel).then((response) => {
                                                const embed = new Discord.MessageEmbed()
                                                .setTitle("Se esta reiniciando tu servidor <a:loading1:825155406703624252> ")
                                                .setColor(settings.embed.color.default)
                                                .setTimestamp()
                                                .setFooter(settings.embed.footer, settings.photourl);
                                                menu.reply.send(embed, true);
                                            }).catch((error) => {
                                                message.channel.send(client.embederror(error))
                                            });
                                        }
                        
                                    })
                                }else if (menu.values[0]==="stop"){
                                    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
                                        if (!row) {
                                            const user = message.author.username
                                            message.channel.send(client.noperm(user))
                                        } else {
                                            const Client = new node.NodeactylClient(settings.panelURL, row.token);
                                            Client.stopServer(serversel).then((response) => {
                                                const embed = new Discord.MessageEmbed()
                                                    .setTitle("Se esta deteniendo tu servidor <a:loading1:825155406703624252>")
                                                    .setColor(settings.embed.color.default)
                                                    .setTimestamp()
                                                    .setFooter(settings.embed.footer, settings.photourl);
                                                menu.reply.send(embed, true);
                                            }).catch((error) => {
                                                message.channel.send(client.embederror(error))
                                            });
                                        }
                        
                                    })
                                }else if (menu.values[0]==="kill"){
                                    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
                                        if (!row) {
                                            const user = message.author.username
                                            message.channel.send(client.noperm(user))
                                        } else {
                                            const Client = new node.NodeactylClient(settings.panelURL, row.token);
                                            Client.killServer(serversel).then((response) => {
                                                const embed = new Discord.MessageEmbed()
                                                    .setTitle("Se ha forzado la detención tu servidor <a:loading1:825155406703624252> ")
                                                    .setColor(settings.embed.color.default)
                                                    .setTimestamp()
                                                    .setFooter(settings.embed.footer, settings.photourl);
                                                menu.reply.send(embed, true);
                                            }).catch((error) => {
                                                message.channel.send(client.embederror(error))
                                            });
                                        };
                        
                                    })
                                }
                                // else if (menu.values[0]==="partialsubuser"){
                                //             const embeddm = new Discord.MessageEmbed()
                                //             .setTitle("Revisa tu privado")
                                //             .setColor(settings.embed.color.default)
                                //             .setFooter(settings.embed.footer, settings.photourl);
                                //             menu.reply.send(embeddm, true);
                                //                 const embed1 = new Discord.MessageEmbed()
                                //                 .setTitle(`Por favor ingrese su token a continuación. Puedes conseguir uno en ${settings.panelURL}/account/api. Tienes 60 segundos!`)
                                //                 .setColor(settings.embed.color.default)
                                //                 .setFooter(settings.embed.footer, settings.photourl);
                                //                 menu.clicker.user.send(embed1).then(async (d) => {
                                //                 const filter = m => m.author.id === message.author.id;
                                //                 d.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected => {
                                //                     console.log(collected.first().content)

                                //                     console.log("1")
                                //                     const correo=collected.first().content
                                //                     return correo;
                                //                 }).then(correo => {
                                //                     console.log("22")
                                //                     console.log(correo)
                                //                     sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
                                //                         if (!row) {
                                //                             const user = message.author.username
                                //                             message.channel.send(client.noperm(user))
                                //                         } else {
                                //                             const Client = new node.NodeactylClient(settings.panelURL, row.token);
                                //                             const permisos=[
                                //                                 "control.console",
                                //                                 "control.start",
                                //                                 "control.stop",
                                //                                 "control.restart",
                                //                                 "backup.create",
                                //                                 "websocket.connect"
                                //                             ]
                                //                             Client.createSubUser(serversel,correo,permisos).then((response) => {
                                                                
                                //                                 console.log("2")
                                //                                 console.log(response)
                                //                                 const servers = new Discord.MessageEmbed()
                                //                                 .setColor(settings.embed.color.default)
                                //                                 .setTitle(`Sub Usuario Añadido`)
                                //                                 .setDescription(`Se ha añadido un subusuario con el correo **${args[1]}** y con permisos para reiniciar y hacer backups`)
                                //                                 .setTimestamp()
                                //                                 .setFooter(settings.embed.footer, settings.photourl);
                                //                                 message.channel.send(servers);
                                //                             })
                                //                         }
                                //                     })
                                //                 })        
                                //             })
                                //     })                           
                                // }
                            }else{
                                menu.reply.send("casi cruck",true)
                            }
                        
                    }else if(menu.id==="backupmenu"){
                        if(menu.clicker.user===message.author){
                            console.log(serversel)
                            if (menu.values[0]==="createbackup"){
                                sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
                                    if (!row) {
                                        const user = message.author.username
                                        message.channel.send(client.noperm(user))
                                    } else {
                                        const Client = new node.NodeactylClient(settings.panelURL, row.token);
                                        Client.createServerBackup(serversel).then((response) => {
                                            const servers = new Discord.MessageEmbed()
                                            .setColor(settings.embed.color.default)
                                            .setTitle(`${message.author.username}'s Backups`)
                                            .setDescription("Se está haciendo un backup del servidor <a:loading1:825155406703624252> ")
                                            .setTimestamp()
                                            .setFooter(settings.embed.footer, settings.photourl);
                                        menu.reply.send(servers, true);
                                        }).catch((error) => {
                                            if (error == 4) {
                                                message.channel.send("No tienes la posibilidad de hacer backups")
                                            } else if (error == 924) {
                                                message.channel.send("Has realizado backups en los ultimos 10 minutos")
                                            } else {
                                                message.channel.send("Ha ocurrido un error: " + error)
                                            }
                            
                                        });
                                    }
                    
                                })
                            }else if (menu.values[0]==="listbackup"){
                                sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
                                    if (!row) {
                                        const user = message.author.username
                                        message.channel.send(client.noperm(user))
                                    } else {
                                        const Client = new node.NodeactylClient(settings.panelURL, row.token);
                                        Client.listServerBackups(serversel).then((response) => {
                                            const url=`https://panel.hosting-xyz.com/server/${serversel}/backups`
                                            const servers = new Discord.MessageEmbed()
                                            .setColor(settings.embed.color.default)
                                            .setTitle(`${message.author.username}'s Backups`)
                                            .setDescription(`Para descargar tus backups [haga click aqui](${url})`)
                                            .setTimestamp()
                                            .setFooter(settings.embed.footer, settings.photourl);
                                            response.forEach(function (element) {
                                                servers.addField(
                                                    `__${element.attributes.name}__`,
                                                    `**Nombre** : ${element.attributes.name}\n**Creado:** ${element.attributes.created_at}\n**Identificador:** ${element.attributes.uuid}`, true)
                                            });
                                            
                                            menu.reply.send(servers, true);
                                        }).catch((error) => {
                                            message.channel.send("Ha ocurrido un error: " + error)
                                        });
                                    }
                    
                                })
                            }else if (menu.values[0]==="dwbackup"){
                                sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
                                    if (!row) {
                                        const user = message.author.username
                                        message.channel.send(client.noperm(user))
                                    } else {
                                        const url=`https://panel.hosting-xyz.com/server/${serversel}/backups`
                                        const servers = new Discord.MessageEmbed()
                                        .setColor(settings.embed.color.default)
                                        .setTitle(`<:descarga:871351680577445918> Descargar Backups <:descarga:871351680577445918>`)
                                        .setDescription(`Para descargar tus backups [haga click aqui](${url})`)
                                        .setTimestamp()
                                        .setFooter(settings.embed.footer, settings.photourl);
                                        menu.reply.send(servers, true);
                                    }
                    
                                })
                            }
                        }else{
                            menu.reply.send("casi cruck",true)
                        }
                        
                    }
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor("#FF2D00")
                    .setTitle(`No tienes permisos`)
                    .setTimestamp()
                    .setDescription("No puedes administrar un servidor que no es el tuyo")
                    .setFooter(settings.embed.footer, settings.photourl);
                    
                    menu.clicker.user.send(embed)
                }
            });
            encendido = true
        }
        sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
            if (!row) {
                const nobien = `You are not registered.`
                message.channel.send(client.embederror(nobien))
            } else {
                const Client = new node.NodeactylClient(settings.panelURL, row.token);
                let servermenu = new MessageMenu()
                servermenu.setMaxValues(1)
                servermenu.setMinValues(1)
                servermenu.setID('menuservers')
                servermenu.setPlaceholder('Selecciona un servidor')

                Client.getAllServers().then(response => {

                    response.data.forEach(function (element) {
                        let option = new MessageMenuOption()
                            .setLabel(element.attributes.name)
                            .setEmoji('🖥️')
                            .setValue(element.attributes.identifier)
                            
                            // .setDescription('Custom Description!')

                        servermenu.addOption(option)
                        
                        console.log(element.attributes.identifier)

                    });
                    const serverembed = new Discord.MessageEmbed()
                    .setColor(settings.embed.color.default)
                    .setTitle(`<:XYZ:839862970175455252> Bienvenido a GameServers de XYZ <:XYZ:839862970175455252>`)
                    .setTimestamp()
                    .setDescription(`Selecciona tu servidor de la lista: \n Una vez seleccionado te saldran 2 menus donde puedes seleccionar distintas opciones`)
                    .setFooter(settings.embed.footer, settings.photourl);
                    message.delete()
                    message.channel.send(serverembed,servermenu).then(servermenu2 => {
                        servermenu2.delete({ timeout: 15000 })
                    })
                }).catch(err => {
                    console.log(err)
                })
                // MenusManager.on('MENU_CLICKED', (menu) => {
                //     console.log('2')
                //     console.log(menu)
                //     if (menu.customID === 'menuservers') {
                //         if (menu.values[0] === '13dd0682') {
                //             return menu.reply('Value 3!');
                //         } else {
                //             return menu.defer();
                //         }
                //     }
                // })

            }
        })
  }
}
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports.help = {
    name: "panel"
}