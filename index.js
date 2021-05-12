require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
    console.log("Client has started.");
})

client.on('message', msg => {
    console.log("Recieved message!");
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});