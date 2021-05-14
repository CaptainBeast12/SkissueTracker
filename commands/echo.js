module.exports = {
	name: 'echo',
	description: 'Echos back whatever is passed in the args.',
	execute(message, args) {
		for (let i = 0; i < args.length; i++) args[i] = args[i].replace(/@everyone|@here|(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi, '');
		const messageToSend = args.join(' ');
		if (messageToSend === null || messageToSend.match(/^ *$/) !== null) return;
		message.channel.send(messageToSend);
	},
};