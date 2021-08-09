const { MessageEmbed } = require('discord.js')
//const embed = require("../../paras/embed")
module.exports = {
  name: "pause",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  

run:(client, message) => {
  const player = message.client.manager.players.get(message.guild.id)
  const color = message.guild.me.roles.highest.color

  if (!player) {
    let embed = new MessageEmbed()
      .setColor("RED")
      .setDescription("Play some songs to use this command.")
    return message.channel.send(embed)
  }

  const { channel } = message.member.voice

 
  if (channel.id !== player.voiceChannel) {
    let embed = new MessageEmbed()
      .setColor("RED")
      .setDescription("Please join my voice channel.")
    return message.channel.send(embed)
  }
  if (player.paused) {
    player.pause(false)
    let embed1 = new MessageEmbed()
    .setDescription("Successfully resumed this song.")
    .setColor("RANDOM")

    return message.chanel.send(embed1)
    
  } else if (!player.paused) {
    player.pause(true)
    let embed2 = new MessageEmbed()
    .setDescription("Successfully paused this song.")
    .setColor("RANDOM")

    return message.channel.send(embed2)
  }
}

}
