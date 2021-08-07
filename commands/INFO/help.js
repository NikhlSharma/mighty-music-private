const discord  =  require("discord.js")
module.exports = {
  name: "help",
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS"],
 
  run: async (client,message,args) => { 
    
    const embed = new discord.MessageEmbed()
    .setColor("RANDOM")
 
 .setURL(``)
.setDescription(`

***Commands***
"\clear,join,leave,loop,nowplaying,pause,play,queue,remove,resume,search,skip,,stop,volume\"

**Other**
\"ping\"

**Advance**
\"nightcore\"
`)
message.channel.send(embed)
  }
}
