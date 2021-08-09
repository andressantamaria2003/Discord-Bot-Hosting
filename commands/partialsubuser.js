const Discord = require("discord.js")
const settings = require("../settings.json")
const node = require('nodeactyl')
const Client = node.Client;
const sql = require("sqlite")
sql.open("./users.sqlite")
module.exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if (!row) {
            const user = message.author.username
            message.channel.send(client.noperm(user))
        } else {
            const Client = new node.NodeactylClient(settings.panelURL, row.token);
            const permisos=[
                "control.console",
                "control.start",
                "control.stop",
                "control.restart",
                "backup.create",
                "websocket.connect"
              ]
            Client.createSubUser(args[0],args[1],permisos).then((response) => {
                console.log(response)
                const servers = new Discord.MessageEmbed()
                .setColor(settings.embed.color.default)
                .setTitle(`Sub Usuario Añadido`)
                .setDescription(`Se ha añadido un subusuario con el correo **${args[1]}** y con permisos para reiniciar y hacer backups`)
                .setTimestamp()
                .setFooter(settings.embed.footer, settings.photourl);
                message.channel.send(servers);
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
}
module.exports.help = {
    name: "addrestuser"
}