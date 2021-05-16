const fs = require('fs');
const counter = require('../counter.json');
const writeCallback = err => err ? console.error(err) : null;

function IsAddedToCounter(id) {
    for (const key in counter.SkillIssue) {
        if (id == key) return true;
    }

    return false;
}

async function GetUserFromMention(guild, mention) {
    const id = mention.match(/^<@!?(\d+)>$/);
    if (!id) return;

    const user = await guild.members.fetch(id[1]);
    if (user) return user;
}

module.exports = {
	name: 'tracker',
	description: 'Add or remove someone to the skill issue tracker.',
	async execute(message, args) {
        if (message.author.id != 224236679177830400) {
            message.channel.send("You don't have the necessary permissions to use this command.");
            return;
        }
        
        if (args.length < 1) {
            message.channel.send(`Error: First argument must be specified.`);
            return;
        } else if (args.length < 2) {
            message.channel.send(`Error: Second argument must be specified.`);
            return;
        }

        const user = await GetUserFromMention(message.guild, args[1]);
        if (!user) {
            message.channel.send("User doesn't exist!");
            return;
        }
        
		switch (args[0].toLowerCase()) {
            case 'add':
                if (IsAddedToCounter(user.id)) {
                    message.channel.send(`**${user.displayName}** is already added to the tracker.`);
                    return;
                }
                
                counter.SkillIssue[user.id] = 0;
                fs.writeFile('./counter.json', JSON.stringify(counter, null, 2), writeCallback);
                message.channel.send(`Successfully added **${user.displayName}** to the tracker!`);
                break;
            case 'remove':
                if (!IsAddedToCounter(user.id)) {
                    message.channel.send(`**${user.displayName}** isn't added to the tracker.`);
                    return;
                }
                
                delete counter.SkillIssue[user.id];
                fs.writeFile('./counter.json', JSON.stringify(counter, null, 2), writeCallback);
                message.channel.send(`Successfully removed **${user.displayName}** from the tracker!`);
                break;
            case 'update':
                if (!IsAddedToCounter(user.id)) {
                    message.channel.send(`**${user.displayName}** isn't added to the tracker.`);
                    return;
                }

                if (!args[2]) {
                    message.channel.send('The update amount must be specified in the third argument.');
                    return;
                }

                args[2] = Math.floor(args[2]);
                counter.SkillIssue[user.id] = args[2];
                fs.writeFile('./counter.json', JSON.stringify(counter, null, 2), writeCallback);
                message.channel.send(`Successfully updated **${user.displayName}'s** value to ${args[2]}!`);
                break;
            default:
                message.channel.send(`Error: ${args[0]} is not a vaild argument.`);
                break;
        }
	},
};