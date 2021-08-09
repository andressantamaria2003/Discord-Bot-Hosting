const settings = require('../settings.json');
const prefixmod = require('discord-prefix');

module.exports = (client, message) => {
    let prefix;
    let defaultPrefix = '.';
    if (!message.guild){
        prefix = defaultPrefix;
    }else{
        prefix = prefixmod.getPrefix(message.guild.id);
        if (!prefix) prefix = defaultPrefix;
    }
    if (message.author.bot) return;
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if (!command.startsWith(prefix)) return;
    let cmd = client.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(client, message, args)
};