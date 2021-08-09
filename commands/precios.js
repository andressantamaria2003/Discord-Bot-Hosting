const Discord = require("discord.js")
const settings = require("../settings.json")
const { MessageButton, MessageActionRow, MessageMenu, MessageMenuOption } = require('discord-buttons');
const { Client, MessageEmbed }  = require('discord.js');
module.exports.run = (client, message, args) => {
    let vps = new MessageMenuOption()
    .setLabel("VPS")
    .setEmoji("867662063958360104")
    .setValue("vps")
    let fivem = new MessageMenuOption()
    .setLabel("FiveM")
    .setEmoji("867658324144816158")
    .setValue("fivem")
    let webhosting = new MessageMenuOption()
    .setLabel("Web Hosting")
    .setEmoji("867662523964194826")
    .setValue("webhosting")
    let minecraft = new MessageMenuOption()
    .setLabel("Minecraft")
    .setEmoji("867658323976912906")
    .setValue("minecraft")
    let rust = new MessageMenuOption()
    .setLabel("Rust")
    .setEmoji("867659529322889216")
    .setValue("rust")
    let teamspeak = new MessageMenuOption()
    .setLabel("TeamSpeak")
    .setEmoji("867658785862451220")
    .setValue("teamspeak")
    let redm = new MessageMenuOption()
    .setLabel("RedM")
    .setEmoji("867658687081611284")
    .setValue("redm")
    let discordbot = new MessageMenuOption()
    .setLabel("DiscordBOT")
    .setEmoji("867658324127907850")
    .setValue("discordbot")
    let proxyfivem = new MessageMenuOption()
    .setLabel("Proxy FiveM")
    .setEmoji("867658324144816158")
    .setValue("proxyfivem")
    const prices = new MessageMenu()
    .setMaxValues(1)
    .setMinValues(1)
    .setID('prices')
    .setPlaceholder('Selecciona producto')
    .addOptions(vps,fivem,webhosting,minecraft,rust,teamspeak,redm,discordbot,proxyfivem)
    const url="https://hosting-xyz.com/index.php/store"
    const embed = new Discord.MessageEmbed()
    .setTitle("💶 Precios 💶")
    .setColor(settings.embed.color.default)
    .setDescription(`**En este menu puedes elegir acciones de backup:**\n\n\n<:pngwing:867662063958360104>   VPS\n\n<:4910_FiveM:867658324144816158>   FiveM\n\n<:logowebsites31315:867662523964194826>   Web Hosting\n\n<:6177minecraftgrassblock:867658323976912906>   Minecraft\n\n<:4161_rust_opt:867659529322889216>   Rust\n\n<:Ts_stacked_bluelight_opt:867658785862451220>   TeamSpeak\n\n<:snail_opt:867658687081611284>   RedM\n\n<:7235bot:867658324127907850>   DiscordBOT\n\n<:4910_FiveM:867658324144816158>   Proxy FiveM\n\n`)
    .setTimestamp()
    .addField(`\nPagina WEB`, `Tambien puedes consultar los precios desde nuestra [pagina web](${url})`)
    .setFooter(settings.embed.footer, settings.photourl);
    message.channel.send(embed,prices)
    client.on('clickMenu', async (menu) => {
        if(menu.clicker.user===message.author){
            if(menu.id==="prices"){
                global.producto=menu.values[0]
                if(producto==="vps"){
                    const vpsembed = new Discord.MessageEmbed()
                    .setTitle("<:pngwing:867662063958360104> VPS <:pngwing:867662063958360104>")
                    .setColor(settings.embed.color.default)
                    .addFields(
                        { name: 'VPS 1', value: `\n\`Núcleos: 1\nRam: 2GB\nAlmacenamiento: 32GB\`\n\n ***Precio: 4€***`, inline: true  },
                        { name: 'VPS 2', value: `\n\`Núcleos: 2\nRam: 4GB\nAlmacenamiento: 50GB\`\n\n ***Precio: 8€***`, inline: true  },
                        { name: 'VPS 3', value: `\n\`Núcleos: 3\nRam: 6GB\nAlmacenamiento: 80GB\`\n\n ***Precio: 12€***`, inline: true  },
                        { name: 'VPS 4', value: `\n\`Núcleos: 4\nRam: 8GB\nAlmacenamiento: 120GB\`\n\n ***Precio: 20€***`, inline: true  },
                        { name: 'VPS 5', value: `\n\`Núcleos: 6\nRam: 10GB\nAlmacenamiento: 160GB\`\n\n ***Precio: 25€***`, inline: true  },
                        { name: 'VPS 6', value: `\n\`Núcleos: 6\nRam: 12GB\nAlmacenamiento: 180GB\`\n\n ***Precio: 32€***`, inline: true  },
                        { name: 'VPS 7', value: `\n\`Núcleos: 8\nRam: 16GB\nAlmacenamiento: 240GB\`\n\n ***Precio: 40€***`, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter(settings.embed.footer, settings.photourl);
                    menu.reply.send(vpsembed,true)
                }else if(producto==="fivem"){
                    const fivemembed = new Discord.MessageEmbed()
                    .setTitle("<:4910_FiveM:867658324144816158> FiveM <:4910_FiveM:867658324144816158>")
                    .setColor(settings.embed.color.default)
                    .addFields(
                        { name: 'FiveM Bundle 1', value: `\n\`vCore: 1\nRam: 2GB\nAlmacenamiento: 10GB\nBackUps: 2\nFirewall FiveM\`\n\n ***Precio: 5€***`, inline: true  },
                        { name: 'FiveM Bundle 2', value: `\n\`vCore: 2\nRam: 4GB\nAlmacenamiento: 15GB\nBackUps: 2\nFirewall FiveM\`\n\n ***Precio: 10€***`, inline: true  },
                        { name: 'FiveM Bundle 3', value: `\n\`vCore: 4\nRam: 8GB\nAlmacenamiento: 20GB\nBackUps: 2\nFirewall FiveM\`\n\n ***Precio: 20€***`, inline: true  },
                        { name: 'FiveM Bundle 4', value: `\n\`vCore: 8\nRam: 16GB\nAlmacenamiento: 25GB\nBackUps: 2\nFirewall FiveM\`\n\n ***Precio: 35€***`, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter(settings.embed.footer, settings.photourl);
                    menu.reply.send(fivemembed,true)
                }else if(producto==="webhosting"){
                    const webhostingembed = new Discord.MessageEmbed()
                    .setTitle("<:logowebsites31315:867662523964194826> Web Hosting <:logowebsites31315:867662523964194826>")
                    .setColor(settings.embed.color.default)
                    .addFields(
                        { name: 'Personal', value: `\n\`Disco: 15GB\nCuentas FTP ilimitadas\nBases de datos Mysql 5\nTransferencia Ilimitada\nDominios Ilimitados\nSubdominios Ilimitados\nCuentas de correo electrónico: 8\n\n Optimización de tu sitio web con cache\nPara crear un sitio web o un blog WordPress\`\n\n ***Precio: 5€***`, inline: true  },
                        { name: 'Personal', value: `\n\`Disco: 30GB\nCuentas FTP ilimitadas\nBases de datos Mysql 10\nTransferencia Ilimitada\nDominios Ilimitados\nSubdominios Ilimitados\nCuentas de correo electrónico: 15\n\n Optimización de tu sitio web con cache\nPara crear un sitio web o un blog WordPress\`\n\n ***Precio: 6€***`, inline: true  },
                        { name: 'Personal', value: `\n\`Disco: 50GB\nCuentas FTP ilimitadas\nBases de datos Mysql 20\nTransferencia Ilimitada\nDominios Ilimitados\nSubdominios Ilimitados\nCuentas de correo electrónico ilimitadas\n\n Optimización de tu sitio web con cache\nPara crear un sitio web o un blog WordPress\`\n\n ***Precio: 8€***`, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter(settings.embed.footer, settings.photourl);
                    menu.reply.send(webhostingembed,true)
                }else if(producto==="minecraft"){
                    const minecraftembed = new Discord.MessageEmbed()
                    .setTitle("<:6177minecraftgrassblock:867658323976912906> Minecraft <:6177minecraftgrassblock:867658323976912906>")
                    .setColor(settings.embed.color.default)
                    .addFields(
                        { name: 'Minecraft Bundle 1', value: `\n\`vCore: 1\nRam: 2GB\nAlmacenamiento: 10GB\nBackUps: 2\`\n\n ***Precio: 5€***`, inline: true  },
                        { name: 'Minecraft Bundle 2', value: `\n\`vCore: 3\nRam: 6GB\nAlmacenamiento: 10GB\nBackUps: 2\`\n\n ***Precio: 10€***`, inline: true  },
                        { name: 'Minecraft Bundle 3', value: `\n\`vCore: 6\nRam: 8GB\nAlmacenamiento: 20GB\nBackUps: 2\`\n\n ***Precio: 25€***`, inline: true  },
                        { name: 'Minecraft Bundle 4', value: `\n\`vCore: 8\nRam: 16GB\nAlmacenamiento: 30GB\nBackUps: 2\`\n\n ***Precio: 45€***`, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter(settings.embed.footer, settings.photourl);
                    menu.reply.send(minecraftembed,true)
                }else if(producto==="rust"){
                    const rustembed = new Discord.MessageEmbed()
                    .setTitle("<:4161_rust_opt:867659529322889216> Rust <:4161_rust_opt:867659529322889216>")
                    .setColor(settings.embed.color.default)
                    .addFields(
                        { name: 'Rust Bundle 1', value: `\n\`vCore: 4\nRam: 4GB\nAlmacenamiento: 10GB\nBackUps: 2\`\n\n ***Precio: 25€***`, inline: true  },
                        { name: 'Rust Bundle 2', value: `\n\`vCore: 4\nRam: 8GB\nAlmacenamiento: 20GB\nBackUps: 2\`\n\n ***Precio: 35€***`, inline: true  },
                        { name: 'Rust Bundle 3', value: `\n\`vCore: 8\nRam: 16GB\nAlmacenamiento: 32GB\nBackUps: 2\`\n\n ***Precio: 50€***`, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter(settings.embed.footer, settings.photourl);
                    menu.reply.send(rustembed,true)
                }else if(producto==="teamspeak"){
                    const teamspeakembed = new Discord.MessageEmbed()
                    .setTitle("<:Ts_stacked_bluelight_opt:867658785862451220> TeamSpeak <:Ts_stacked_bluelight_opt:867658785862451220>")
                    .setColor(settings.embed.color.default)
                    .addFields(
                        { name: 'TeamSpeak Spain Lite', value: `\n\`vCore: 1\nRam: 512MB\nHasta Slots 1024\nUbicación España Interxion Madrid\nBackUps: 1\`\n\n ***Precio: 5€***`, inline: true  },
                        { name: 'TeamSpeak Spain Premium', value: `\n\`vCore: 1\nRam: 1024MB\nHasta Slots 1024\nUbicación España Interxion Madrid\nBackUps: 2\`\n\n ***Precio: 9€***`, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter(settings.embed.footer, settings.photourl);
                    menu.reply.send(teamspeakembed,true)
                }else if(producto==="redm"){
                    const redmembed = new Discord.MessageEmbed()
                    .setTitle("<:snail_opt:867658687081611284> RedM <:snail_opt:867658687081611284>")
                    .setColor(settings.embed.color.default)
                    .addFields(
                        { name: 'RedM Bundle 1', value: `\n\`vCore: 1\nRam: 2GB\nAlmacenamiento: 10GB\nBackUps: 2\nFirewall RedM\`\n\n ***Precio: 5€***`, inline: true  },
                        { name: 'RedM Bundle 2', value: `\n\`vCore: 2\nRam: 4GB\nAlmacenamiento: 15GB\nBackUps: 2\nFirewall RedM\`\n\n ***Precio: 25€***`, inline: true  },
                        { name: 'RedM Bundle 3', value: `\n\`vCore: 4\nRam: 8GB\nAlmacenamiento: 20GB\nBackUps: 2\nFirewall RedM\`\n\n ***Precio: 35€***`, inline: true  },
                        { name: 'RedM Bundle 4', value: `\n\`vCore: 8\nRam: 16GB\nAlmacenamiento: 25GB\nBackUps: 2\nFirewall RedM\`\n\n ***Precio: 55€***`, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter(settings.embed.footer, settings.photourl);
                    menu.reply.send(redmembed,true)
                }else if(producto==="discordbot"){
                    const discordbotembed = new Discord.MessageEmbed()
                    .setTitle("<:7235bot:867658324127907850> DiscordBOT <:7235bot:867658324127907850>")
                    .setColor(settings.embed.color.default)
                    .addFields(
                        { name: 'Discord Bot Basic', value: `\n\`vCore: 1\nRam: 1,5GB\nAlmacenamiento: 1GB\nBackUps: 2\nSQL\`\n\n ***Precio: 2,5€***`, inline: true  },
                        { name: 'Discord Bot Advanced', value: `\n\`vCore: 2\nRam: 2,5GB\nAlmacenamiento: 4GB\nBackUps: 2\nSQL\`\n\n ***Precio: 5,5€***`, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter(settings.embed.footer, settings.photourl);
                    menu.reply.send(discordbotembed,true)
                }else if(producto==="proxyfivem"){
                    const proxyfivemembed = new Discord.MessageEmbed()
                    .setTitle("<:4910_FiveM:867658324144816158> Proxy FiveM <:4910_FiveM:867658324144816158>")
                    .setColor(settings.embed.color.default)
                    .addFields(
                        { name: 'Fivem Proxy Basic', value: `\n\`Firewall UDP/TCP\nProtect Layer4/7\nUS / Canada / France / UK / Germany\n 250 Mb/s\nTrafico ilimitado\`\n\n ***Precio: 25€***`, inline: true  },
                        { name: 'Fivem Proxy Comfort', value: `\n\`Firewall UDP/TCP\nProtect Layer4/7\nUS / Canada / France / UK / Germany\n 500 Mb/s\nTrafico ilimitado\`\n\n ***Precio: 35€***`, inline: true  },
                        { name: 'Fivem Proxy Elite', value: `\n\`Firewall UDP/TCP\nProtect Layer4/7\nUS / Canada / France / UK / Germany\n 1 Gb/s\nTrafico ilimitado\`\n\n ***Precio: 60€***`, inline: true  },
                        { name: 'Fivem Proxy Advanced', value: `\n\`Firewall UDP/TCP\nProtect Layer4/7\nUS / Canada / France / UK / Germany\n 2 Gb/s\nTrafico ilimitado\`\n\n ***Precio: 80€***`, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter(settings.embed.footer, settings.photourl);
                    menu.reply.send(proxyfivemembed,true)
                }
            }
        }
    });







}
module.exports.help = {
    name: "precios"
}
