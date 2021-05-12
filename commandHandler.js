const {prefix} = require('./config.json');
const fs = require('fs');

let commands = {};

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.name] = command;
}

module.exports = function(message) 
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!commands[command]) return;
    try 
    {
        commands[command].execute(message, args);
    } 
    catch(error) 
    {
        console.error(error);
        message.reply('An error occured while trying to execute the command.');
    }
}