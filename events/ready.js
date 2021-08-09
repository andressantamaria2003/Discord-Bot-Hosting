const sql = require('sqlite')
const Discord = require('discord.js');
sql.open('./users.sqlite')
const settings = require('../settings.json');
module.exports = async (client) => {
    client.logger.log("to serve you!", "ready");
    client.user.setPresence({ watching: { name: ` ${settings.panelURL}` }, status: 'online' })
    sql.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER, token TEXT)`);
    sql.run(`CREATE TABLE IF NOT EXISTS usersvps (id INTEGER, token TEXT)`);
};