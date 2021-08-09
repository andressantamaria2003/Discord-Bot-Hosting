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
                "user.create",
                "user.update",
                "user.delete",
                "user.read",
                "file.create",
                "file.read",
                "file.read-content",
                "file.update",
                "file.delete",
                "file.archive",
                "file.sftp",
                "backup.create",
                "backup.read",
                "backup.delete",
                "backup.update",
                "backup.download",
                "backup.restore",
                "allocation.update",
                "startup.update",
                "startup.read",
                "startup.docker-image",
                "database.create",
                "database.read",
                "database.update",
                "database.delete",
                "database.view_password",
                "schedule.create",
                "schedule.read",
                "schedule.update",
                "settings.rename",
                "schedule.delete",
                "settings.reinstall",
                "websocket.connect"
              ]
            Client.createSubUser(args[0],args[1],permisos).then((response) => {
                console.log(response)
                const servers = new Discord.MessageEmbed()
                .setColor(settings.embed.color.default)
                .setTitle(`Sub Usuario Añadido`)
                .setDescription(`Se ha añadido un subusuario con el correo **${args[1]}** y con todos los permisos`)
                .setTimestamp()
                .setFooter(settings.embed.footer, settings.photourl);
                message.channel.send(servers);
            }).catch((error) => {
                message.channel.send("Ha ocurrido un error: " + error)
            });
        }

    })
}
module.exports.help = {
    name: "addfulluser"
}