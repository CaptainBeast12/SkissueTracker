const counter = require('../counter.json');
const counterEmbed = {
	color: 0x2f78d6,
	title: 'Skill issue counter',
	description: ''
};

module.exports = {
	name: 'counter',
	description: 'Shows how many times a certain someone has said skill issue.',
	async execute(message, args) {
		let description = '';
		const usernames = [];
        for (const key in counter.SkillIssue) {
			const user = await message.guild.members.fetch(key);
			if (!user) continue;
			usernames.push(user);
		}

		usernames.sort((a, b) => counter.SkillIssue[b.id] - counter.SkillIssue[a.id]);
		for (let i = 0; i < usernames.length; i++) description += `**${usernames[i].displayName}** has said skill issue ${counter.SkillIssue[usernames[i].id]} time(s)!\n`;
		if (description.length <= 0) return;
		counterEmbed.description = description;
		message.channel.send({embed: counterEmbed});
	},
};