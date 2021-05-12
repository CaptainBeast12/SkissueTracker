require('dotenv').config();

const Discord = require('discord.js');
const CommandHandler = require('./commandHandler');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
    console.log("Client has started.");
})

client.on('message', CommandHandler);