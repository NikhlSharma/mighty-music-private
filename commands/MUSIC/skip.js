const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "skip",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
run: (client, message, args) => {
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
      .setDescription(`Please join my voice channel.`)
    return message.channel.send(embed)
  }

  player.stop()
  return message.channel.send({
    embed: {
      color: "BLUE",
      description:'Successfully skiped this song.'}})
}}
