const Discord = require("discord.js")
const settings = require("../settings.json")
const node = require('nodeactyl')
const Client = node.Client;
const sql = require("sqlite")
const prefixmod = require('discord-prefix');
sql.open("./users.sqlite")
module.exports.run = (client, message, args) => {
    const embed= new Discord.MessageEmbed()
    .setTitle("Cambio Prefix")
    .setColor(settings.embed.color.default)
    .setFooter(settings.embed.footer, settings.photourl);
    if (message.guild){
        if(args[0]){
            prefixmod.setPrefix(args[0], message.guild.id);
            const prefixactu=prefixmod.getPrefix(message.guild.id)
            embed.setDescription(`Se ha establecido el prefix ${prefixactu}`)
            message.channel.send(embed)
        }else{
            embed.setDescription("Debes introducir un prefix")
            message.channel.send(embed)
        }
    }else{
        embed.setDescription("Este comando solo es valido para Servidores")
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: "prefix"
}