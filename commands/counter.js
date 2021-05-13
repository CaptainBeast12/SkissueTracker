module.exports = {
	name: 'counter',
	description: 'Shows how many times a certain someone has said skill issue.',
	async execute(message, args) {
		const counter = require('../counter.json');
		let description = '';
        for (const key in counter.SkillIssue) {
			const user = await message.guild.members.fetch(key);
			if (!user) continue;
			description += `**${user.displayName}** has said skill issue ${counter.SkillIssue[key]} amount of time(s)!\n`;
		}

		if (description.length <= 0) return;
		const counterEmbed = {
			color: 0x2f78d6,
			title: 'Skill issue counter',
			description: description
		};
		message.channel.send({embed: counterEmbed});
	},
};