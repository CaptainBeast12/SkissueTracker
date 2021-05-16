require('dotenv').config();

const Discord = require('discord.js');
const CommandHandler = require('./commandHandler');
const counter = require('./counter');
const fs = require('fs');
const client = new Discord.Client();

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
    const skillIssueCount = message.content.match(/skill issue/gi);
    if (!skillIssueCount) return;

    counter.SkillIssue[id] += skillIssueCount.length;
    message.channel.send(`**${message.member.displayName}** has said skill issue ${counter.SkillIssue[id]} time(s)!`);
    fs.writeFile('./counter.json', JSON.stringify(counter, null, 2), err => err ? console.error(err) : null);
}