require('dotenv').config();

const Discord = require('discord.js');
const CommandHandler = require('./commandHandler');
const fs = require('fs');
const client = new Discord.Client();

let counter = require('./counter');

client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
    console.log("Client has started.");
});

client.on('message', CommandHandler);
client.on('message', SkillIssue);

function SkillIssue(message) {
    const id = message.author.id;
    let foundId = false;
    for (const key in counter.SkillIssue) {
        if (id == key) {
            foundId = true;
            break;
        }
    }

    if (!foundId) return;
    if (!message.content.toLowerCase().includes('skill issue')) return;
    
    counter.SkillIssue[id]++;
    message.channel.send(`**${message.member.displayName}** has said skill issue ${counter.SkillIssue[id]} time(s)!`);
    fs.writeFile('./counter.json', JSON.stringify(counter, null, 2), UpdateJSON);
}

function UpdateJSON(error) {
    if (error) return console.error(error);
}