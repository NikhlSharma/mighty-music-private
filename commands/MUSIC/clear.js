const { MessageEmbed } = require('discord.js')
//const embed = require("../../paras/embed")
module.exports = {
  name: "clear",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
run: async (client, message, args) => {
  const player = message.client.manager.players.get(message.guild.id)
 const { channel } = message.member.voice

if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Please join my voice channel.`
        
        
        )
   return message.channel.send(embed)
 }
 
 
 player.queue.length = [];
 const embed = new MessageEmbed()
 
 .setDescription(`Successfully cleared.`)
 .setColor("BLUE")

 message.channel.send(embed);
}}
