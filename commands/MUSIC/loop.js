const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "loop",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
run: async (client, message, args) => {

const player = message.client.manager.players.get(message.guild.id)
 const { channel } = message.member.voice


 if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed()
      .setColor("RED")
      .setDescription("Please join my voice channel.")
   return message.channel.send(embed)
 }
 
   
if (!args[0] || args[0].toLowerCase() == 'song') {
			if (!player.trackRepeat) {
				player.setTrackRepeat(true);
				 let embed1 = new MessageEmbed()
         .setDescription('Successfully started looping this song.')
         .setColor("YELLOW")

         return message.channel.send(embed1)
			}
			else {
				player.setTrackRepeat(false);
				 let embed2 = new MessageEmbed()
         .setDescription("Successfully stoped looping this song.")
         .setColor("RED")

         return message.channel.send(embed2)
			}
		}
		else if (args[0] == 'queue') {
			if (player.queueRepeat) {
				player.setQueueRepeat(false);
			 let embed3 = new MessageEmbed()
       .setDescription("Successfully stoped looping this queue.")
       .setColor("RED")

       return message.channel.send(embed3)
			}
			else {
				player.setQueueRepeat(true);
				 let embed4 = new MessageEmbed()
         .setDescription("Successfully started looping this queue.")
         .setColor("YELLOW")

         return message.channel.send(embed4)
			}
		}
 
 
}}
