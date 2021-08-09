const Discord = require("discord.js")
const settings = require("../settings.json")
const sql = require("sqlite");
sql.open("./users.sqlite")
module.exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if (!row) {
            message.reply(`¡Revisa tus DM's para registrarte con el panel!`)
            const embed1 = new Discord.MessageEmbed()
                .setTitle(`Por favor ingrese su token a continuación. Puedes conseguir uno en ${settings.panelURL}/account/api. Tienes 60 segundos!`)
                .setColor(settings.embed.color.default)
                .setFooter(settings.embed.footer, settings.photourl);
            message.author.send(embed1).then(async (d) => {
                const filter = m => m.author.id === message.author.id;
                d.channel.awaitMessages(filter, { max: 1, time: 60000 })
                    .then(collected => {
                        sql.run(`INSERT INTO users (id, token) VALUES ("${message.author.id}", "${collected.first().content}")`).catch(error => {
                            return message.channel.send(client.embederror(error))

                        });
                        const embed2 = new Discord.MessageEmbed(embed1)
                            .setTitle(`¡Se ha registrado en la base de datos!`);
                        d.edit(embed2)
                    })
                    .catch(collected => {
                        if (collected.size === 0) {
                            return d.edit(client.embederror(`No proporcionó un token dentro de la cantidad de tiempo dado.`))
                        };
                    }).catch(err => {
                        message.channel.send(client.embederror(err))
                    });
            }).catch(err => {
                message.channel.send(client.embederror(err))
            });
        } else {
            message.reply(`Ya estas en la base de datos, si quieres restablecer tu token. \`!reset\``)
        };
    });
}
module.exports.help = {
    name: "register"
}