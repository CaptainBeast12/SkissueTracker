module.exports = {
	name: 'echo',
	description: 'Echos back whatever is passed in the args.',
	execute(message, args) {
		message.channel.send(args.join(' '));
	},
};