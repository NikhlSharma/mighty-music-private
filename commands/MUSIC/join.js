const { MessageEmbed } = require('discord.js')
//const embed = require("../../paras/embed")
module.exports = {
  name: "join",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
run: async (client, message, args) => {
 
 let player = client.manager.players.get(message.guild.id);

		// Check if bot has permission to connect to voice channel
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT')) {
      const embed3 = new MessageEmbed()
			.setDescription("I need **CONNECT** permission.")
      .setColor("RED")

      message.channel.send(embed3).then(m => m.delete({ timeout: 20000 }));
		}

		// Check if bot has permission to speak in the voice channel
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has('SPEAK')) {
			return embed("I need **SPEAK** permission.",message.channel).then(m => m.delete({ timeout: 20000 }));
		}

		// If no player create one and join channel
		if (!player) {
			try {
				player = client.manager.create({
					guild: message.guild.id,
					voiceChannel: message.member.voice.channel.id,
					textChannel: message.channel.id,
					selfDeafen: true,
				});
				await player.connect();
        const embed2 = new MessageEmbed()
        .setColor('#3c19bb')
		.setDescription(`Successfully joined ${message.member.voice.channel}`)
	
		message.channel.send(embed2);
			} catch (err) {
				embed(`error : ${err.message}`,message.channel)
			}
		} else {
			// Move the bot to the new voice channel / update text channel
			try {
				await player.setVoiceChannel(message.member.voice.channel.id);
				await player.setTextChannel(message.channel.id);
				const embed = new MessageEmbed()
					.setColor("#3c19bb")
					.setDescription(`Successfully joined ${message.member.voice.channel}`);
				message.channel.send(embed);
			} catch (err) {
			embed(`Error: ${err.message}`,message.channel).then(m => m.delete({ timeout: 5000 }))
			}
		}
	}
};
