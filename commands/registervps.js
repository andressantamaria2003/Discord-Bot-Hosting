const Discord = require("discord.js")
const settings = require("../settings.json")
const sql = require("sqlite");
sql.open("./users.sqlite")
module.exports.run = (client, message, args) => {
    console.log(settings.owner)
    if (message.author==settings.owner || message.author==settings.owner2){
        sql.get(`SELECT * FROM usersvps WHERE id = "${args[0]}"`).then(row => {
            if (!row) {
                    sql.run(`INSERT INTO usersvps (id, token) VALUES ("${args[0]}", "${args[1]}")`).catch(error => {
                        return message.channel.send(client.embederror(error))

                    });
                    message.author.send(`Se ha asignado a el usuario con ID ${args[0]} la VPS con ID ${args[1]}`)
            } else {
                message.reply(`Ya esta registrado en la base de datos, si quieres restablecer su vinculación. \`!resetvps\``)
            };
        });
    } else{
        message.author.send("No eres administrador de XYZ")
    }
}
module.exports.help = {
    name: "registervps"
}