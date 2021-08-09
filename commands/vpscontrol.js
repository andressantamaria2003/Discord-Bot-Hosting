const Discord = require("discord.js")
const settings = require("../settings.json")
const pveajs = require("pvea")
const pvea = new pveajs(settings.proxmoxurl,'root@pam',settings.proxmoxpass)
const { MessageButton, MessageActionRow, MessageMenu, MessageMenuOption } = require('discord-buttons');
const sql = require("sqlite")
module.exports.run = (client, message, args) => {
    let start = new MessageButton()
    .setStyle('green')
    .setLabel('Iniciar') 
    .setEmoji("870630272356466736")
    .setID('start') 

    let stop = new MessageButton()
    .setStyle('red')
    .setLabel('Detener') 
    .setEmoji("870630798729027654")
    .setID('stop') 
    let reboot = new MessageButton()
    .setStyle('grey')
    .setLabel('Reinciar')
    .setEmoji("825156850495913996")
    .setID('reboot') 
    let info = new MessageButton()
    .setStyle('grey')
    .setLabel('Estado')
    .setEmoji("871171472352239666")
    .setID('info') 

    let row = new MessageActionRow()
    .addComponents(start, reboot, stop, info);
    const vpscontrol = new Discord.MessageEmbed()
    .setTitle("Control VPS")
    .setColor(settings.embed.color.default)
    .setDescription(`**En este menu puedes elegir acciones para tu VPS**`)
    .setTimestamp()
    .setFooter(settings.embed.footer, settings.photourl);
    message.delete()
    message.channel.send(vpscontrol, row).then(embedstatus => {
        embedstatus.delete({ timeout: 15000 })
    })
    client.once('clickButton', async (button) => {
        
            if (button.id=="stop"){
                sql.get(`SELECT * FROM usersvps WHERE id = "${message.author.id}"`).then(row => {
                    if (!row) {
                        const user = message.author.username
                        button.reply.send(client.noperm(user),true)
                    } else {
                        const vpsid=row.token
                        async function stopvps() {
                            pvea.getNodes().then( res => {
                                global.node1=res[0].node
                                pvea.stopQemuVm(node1,vpsid).then( res => {
                                    if (res.status=="200"){
                                        const embed = new Discord.MessageEmbed()
                                        .setTitle("Se ha detenido la vps <a:loading1:825155406703624252> ")
                                        .setColor(settings.embed.color.default)
                                        .setTimestamp()
                                        .setFooter(settings.embed.footer, settings.photourl);
                                        button.reply.send(embed,true)
                                    }else{
                                        button.reply.send("Se ha producido un error",true)
                                    }
                                })
                            })
                        }
                        pvea.run(stopvps)
                    }
                })
            }else if (button.id=="start"){
                sql.get(`SELECT * FROM usersvps WHERE id = "${message.author.id}"`).then(row => {
                    if (!row) {
                        const user = message.author.username
                        button.reply.send(client.noperm(user),true)
                    } else {
                        const vpsid=row.token
                        async function stopvps() {
                            pvea.getNodes().then( res => {
                                global.node1=res[0].node
                                pvea.startQemuVm(node1,vpsid).then( res => {
                                    if (res.status=="200"){
                                        const embed = new Discord.MessageEmbed()
                                        .setTitle("Se ha iniciado la vps <a:loading1:825155406703624252> ")
                                        .setColor(settings.embed.color.default)
                                        .setTimestamp()
                                        .setFooter(settings.embed.footer, settings.photourl);
                                        button.reply.send(embed,true)
                                    }else{
                                        button.reply.send("Se ha producido un error",true)
                                    }
                                })
                            })
                        }
                        pvea.run(stopvps)
                    }
                })
            }else if (button.id=="reboot"){
                sql.get(`SELECT * FROM usersvps WHERE id = "${message.author.id}"`).then(row => {
                    if (!row) {
                        const user = message.author.username
                        button.reply.send(client.noperm(user),true)
                    } else {
                        const vpsid=row.token
                        async function stopvps() {
                            pvea.getNodes().then( res => {
                                global.node1=res[0].node
                                pvea.rebootQemuVm(node1,vpsid).then( res => {
                                    if (res.status=="200"){
                                        const embed = new Discord.MessageEmbed()
                                        .setTitle("Se esta reiniciando la vps <a:gif:862676746251272233>")
                                        .setColor(settings.embed.color.default)
                                        .setTimestamp()
                                        .setFooter(settings.embed.footer, settings.photourl);
                                        button.reply.send(embed,true)
                                    }else{
                                        button.reply.send("Se ha producido un error",true)
                                    }
                                })
                            })
                        }
                        pvea.run(stopvps)
                    }
                })
            }else if (button.id=="info"){
                sql.get(`SELECT * FROM usersvps WHERE id = "${message.author.id}"`).then(row => {
                    if (!row) {
                        const user = message.author.username
                        button.reply.send(client.noperm(user),true)
                    } else {
                        const vpsid=row.token
                        async function stopvps() {
                            pvea.getNodes().then( res => {
                                global.node1=res[0].node
                                pvea.getCurrentQemuVmState(node1,vpsid).then( res => {
                                    let logo
                                    let embedcolor
                                    if (res.qmpstatus=="running"){
                                        logo="<a:green_loading:825156160628981820>"
                                        embedcolor="#00FF17"
                                    }else{
                                        logo="<a:5270verifyred:871178021338480650>"
                                        embedcolor="#FF0000"
                                    }
                                    const usedram=res.mem
                                    const totalram=res.maxmem
                                    const freeram=totalram-usedram
                                    const usedcpu=res.cpu*100
                                    const totalcpu=100
                                    const freecpu=totalcpu-usedcpu
                                    const full = "<:uptimeazulup:871489170101649408>";
                                    const empty = "<:uptimeazuldown:871488991667572806>";
                                    const diskspace=res.maxdisk
                                    const diagramMaker = (usedram, freeram) => {
                                        const total = usedram + freeram;
                                        used = Math.round((usedram / total) * 14);
                                        free = Math.round((freeram / total) * 14);
                                        return full.repeat(used) + empty.repeat(free);
                                    };
                                    const embed = new Discord.MessageEmbed()
                                    .setTitle(`${logo} Estado de tu maquina ${logo}`)
                                    .setColor(embedcolor)
                                    .addFields(
                                        { name: '**<:ram:871176432494215168> RAM <:ram:871176432494215168>**', value: `${diagramMaker(usedram,freeram)}\n En uso ${(usedram/1073741823).toFixed(2)}/${(totalram/1073741823).toFixed(2)} GB`, inline: false},
                                        { name: '**<:cpu:871176431823122482> CPU <:cpu:871176431823122482>**', value: `${diagramMaker(usedcpu,freecpu)}\n En uso ${(usedcpu.toFixed(1))}%`, inline: false},
                                        { name: '**Disco Duro**', value: `El espacio total de disco duro es de ${(diskspace/1073741823).toFixed(2)} GB`, inline: false},
                                      )
                                    .setTimestamp()
                                    .setFooter(settings.embed.footer, settings.photourl);
                                    button.reply.send(embed,true)
                            
                                })
                            })
                        }
                        pvea.run(stopvps)
                    }
                })
            }  
    });

        

}

module.exports.help = {
    name: "vps"
}