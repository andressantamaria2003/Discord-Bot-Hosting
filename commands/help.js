const Discord = require("discord.js")
const settings = require("../settings.json")
const { MessageButton, MessageActionRow, MessageMenu, MessageMenuOption } = require('discord-buttons');
const { Client, MessageEmbed }  = require('discord.js');
const axios = require('axios');
const prefixmod = require('discord-prefix');

module.exports.run = (client, message, args) => {
  const p = ".";
  let vpshelp = new MessageButton()
  .setStyle('grey')
  .setLabel("VPS")
  .setEmoji("867662063958360104")
  .setID("vpshelp")
  let menuhelp = new MessageButton()
  .setStyle('grey')
  .setLabel("GameServer")
  .setEmoji("🎮")
  .setID("menuhelp")
  let precioshelp = new MessageButton()
  .setStyle('grey')
  .setLabel("Precios")
  .setEmoji("💶")
  .setID("precioshelp")
  let status = new MessageButton()
  .setStyle('grey')
  .setLabel("Estado")
  .setEmoji("📈")
  .setID("status")
  let row = new MessageActionRow()
  .addComponents(vpshelp,menuhelp,precioshelp,status)
  const embed = new Discord.MessageEmbed()
    .setTitle("🙋 Ayuda 🙋")
    .setColor(settings.embed.color.default)
    .setDescription(`Seleccione en que necesitas ayuda`)
    .setTimestamp()
    .setFooter(settings.embed.footer, settings.photourl);
  message.channel.send(embed,row)
  client.on('clickButton', async (button) => {
    
    if (button.id==="menuhelp"){
      const discordurl="https://panel.hosting-xyz.com/account/api"
      const embed = new Discord.MessageEmbed()
      .setTitle("🎮 Panel 🎮")
      .setColor(settings.embed.color.default)
      .setDescription(`Utiliza el comando \`${p}panel\` para realizar acciones en tu GameServer`)
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '**Vincular GameServer**', value: `Para vinclar tu GameServer con el bot debes escribir al bot ${p}register y introducir una api key que bdebes sacar del panelweb en el siguiente enlace [API KEY PANEL](${discordurl})`, inline: false},
        { name: '\u200B', value: '\u200B' },
        { name: '**Seleccion servidor**', value: `Una vez te registres ejecuta el comando ${p}panel y selecciona el gamaserver sobre el que quieres realizar acciones`, inline: false},
        { name: '\u200B', value: '\u200B' },
        { name: '**Menus**', value: `Una vez seleccionado el servidor te apareceran 2 menus nuevos desde los cuales puedes realizar distintas acciones y el estado de tu servidor`, inline: false},
      )
      .setTimestamp()
      .setImage("https://cdn.discordapp.com/attachments/808463075354345513/871158558241198110/unknown.png")
      .setFooter(settings.embed.footer, settings.photourl);
      button.reply.send(embed,true)
    }else if(button.id==="precioshelp"){
      const embed = new Discord.MessageEmbed()
      .setTitle("💶 Precios 💶")
      .setColor(settings.embed.color.default)
      .setDescription(`Para ver los precios introduce \`${p}precios\` y selecciona el producto sobre el que quieres conocer el precio`)
      .setTimestamp()
      .setFooter(settings.embed.footer, settings.photourl);
      button.reply.send(embed,true)
    }else if(button.id==="vpshelp"){
      const discordurl="https://discord.hosting-xyz.com"
      const embed = new Discord.MessageEmbed()
      .setTitle("<:pngwing:867662063958360104>  VPS  <:pngwing:867662063958360104> ")
      .setColor(settings.embed.color.default)
      .setDescription(`Utiliza el comando \`${p}vps\` para realizar acciones con las VPS`)
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '**Vincular VPS**', value: `Para vincular tu VPS con el bot debes abrir un ticket en el [discord de XYZ](${discordurl})`, inline: false},
        { name: '\u200B', value: '\u200B' },
        { name: '**Manejar VPS**', value: `Para manejar tu VPS haga click sobre una de las opciones que sale debajo al escribir ${p}vps`, inline: false  },
      )
      .setImage("https://cdn.discordapp.com/attachments/808463075354345513/871059008453238814/unknown.png")
      .setTimestamp()
      .setFooter(settings.embed.footer, settings.photourl);
      button.reply.send(embed,true)
    }else if(button.id==="status"){
      global.serverembed = new Discord.MessageEmbed()
      .setColor(settings.embed.color.default)
      .setTitle(`<:XYZ:839862970175455252> UPTime XYZ <:XYZ:839862970175455252>`)
      .setTimestamp()
      .setFooter(settings.embed.footer, settings.photourl);
      axios.get('https://api.hetrixtools.com/v1/60e48c9e18e088c12d425c875c1427e1/uptime/monitors/0/30/').then(response => {
          response.data[0].forEach(server => {
              let logo
              let estado
              if(server.Uptime_Status=="Offline"){
                  logo="<a:5270verifyred:871178021338480650>"
                  estado="DOWN"

              }else{
                  logo="<a:ezgif:871861566646124584>"
                  estado="UP"
              }
              const uptime=server.Uptime_Stats.Total.Uptime
              const uptime2=parseFloat(uptime).toFixed(2)
              const total=100
              const freeram=total-uptime
              
              const full = "<:uptimeazulup:871489170101649408>";
              const empty = "<:uptimeazuldown:871488991667572806>";
              const diagramMaker = (uptime, freeram) => {
                  used = Math.round((uptime / total) * 10);
                  free = Math.round((freeram / total) * 10);
                  return full.repeat(used) + empty.repeat(free);
              };
              serverembed.addField(`${logo}   **${server.Name}**`, `  ${diagramMaker(uptime,freeram)}\n\`${uptime2}/100\``)
          })
          
          

          button.reply.send(serverembed,true)
      });
    }

  })
}
module.exports.help = {
  name: "help"
}


