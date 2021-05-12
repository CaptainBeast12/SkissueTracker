module.exports = {
	name: 'counter',
	description: 'Shows how many times a certain someone has said skill issue.',
	async execute(message, args) {
		const counter = require('../counter.json');
        const user = await message.guild.members.fetch('775377251859824651')
        message.channel.send(`${user.displayName} has said skill issue ${counter.SkillIssue[user.id]} time(s)!`)
	},
};