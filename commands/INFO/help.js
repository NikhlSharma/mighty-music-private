const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "help", 
	run: async (client, message, args) => {

 let embed = new MessageEmbed()
 .setTitle('COMMANDS')
 .setDescription(`
 <a:arrow2:891266124082204705> **Everyone commands
 **play,join,clear,leave,loop,move,queue,now-playing,pause,previous,remove,resume,search,seek,skip.volume

 <a:arrow2:891266124082204705> **Info commands**
  ping,help
 `)

message.channel.send(embed)
  }
};
