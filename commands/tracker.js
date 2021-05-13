const fs = require('fs');
let counter = require('../counter.json');

function IsAddedToCounter(id) {
    counter = require('../counter.json');
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

function UpdateJSON(error) {
    if (error) return console.error(error);
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
		switch (args[0].toLowerCase()) {
            case 'add':
                if (!user) return;
                if (IsAddedToCounter(user.id)) {
                    message.channel.send(`User **${user.displayName}** is already added to the tracker.`);
                    return;
                }
                
                counter.SkillIssue[user.id] = 0;
                fs.writeFile('./counter.json', JSON.stringify(counter, null, 2), UpdateJSON);
                message.channel.send(`Successfully added **${user.displayName}** to the tracker!`);
                break;
            case 'remove':
                if (!user) return;
                if (!IsAddedToCounter(user.id)) return;
                
                delete counter.SkillIssue[user.id];
                fs.writeFile('./counter.json', JSON.stringify(counter, null, 2), UpdateJSON);
                message.channel.send(`Successfully deleted **${user.displayName}** from the tracker!`);
                break;
            default:
                message.channel.send(`Error: ${args[0]} is not a vaild argument.`)
                break;
        }
	},
};