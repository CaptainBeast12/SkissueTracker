module.exports = {
	name: 'echo',
	description: 'Echos back whatever is passed in the args.',
	execute(message, args) {
		for (let i = 0; i < args.length; i++) {
			if (args[i] == '@here' || args[i] == '@everyone') {
				args.splice(i, 1);
			}
		}

		if (args.length <= 0) return;
		message.channel.send(args.join(' '));
	},
};