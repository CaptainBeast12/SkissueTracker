module.exports = {
	name: 'echo',
	description: 'Echos back whatever is passed in the args.',
	execute(message, args) {
		for (let i = 0; i < args.length; i++) {
			if (args[i].includes('@here') || args[i].includes('@everyone')) {
				args[i] = args[i].replace('@here', '');
				args[i] = args[i].replace('@everyone', '');
			}
		}

		if (args.length <= 0) return;
		message.channel.send(args.join(' '));
	},
};