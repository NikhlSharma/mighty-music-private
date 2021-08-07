let cooldown = {}
const {MessageEmbed} = require("discord.js")
const discord  = require("discord.js")
const {  default_prefix } = require("../config.json");

module.exports = {
  name: "message",
  async execute(client,message) {
    let prefix = await client.db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

const mention= new RegExp(`^<@!?${client.user.id}>( |)$`);


if (message.content.match(mention)) {
      const embed =new discord.MessageEmbed()
      .setDescription("My prefix is -")
      .setColor("RED")
      message.channel.send(embed)
  };

const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  const paras = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : prefix;

if (message.author.bot) return;
  if (!message.guild) return;
  
  if (!message.content.startsWith(paras)) return;

  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(paras.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  
  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  //if (command) command.run(client, message, args);
  
  if (!command) return;

  //-------------------------------------------- P E R M I S S I O N -------------------------------------------



  if (command.botPermission) {
    let neededPerms = []

    command.botPermission.forEach(p => {
      if (!message.guild.me.hasPermission(p)) neededPerms.push("**" + p + "**")
    })

    if (neededPerms.length) return message.channel.send(` I need ${neededPerms.join(", ")} permission.`)
  } 
   if (command.userPermission) {
    let neededPerms = []


    command.userPermission.forEach(p => {
      if (!message.member.hasPermission(p)) neededPerms.push("**" + p + "**")
    })

    if (neededPerms.length) return message.channel.send(` You need ${neededPerms.join(", ")} permission.`)
  }

  // ---------------------------------------------O W N E R ----------------------------------------------------------
if(command.vcOnly){
    const { channel } = message.member.voice;
  

 if (!channel) {
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Join a voice channel to use this command.`)
  return message.channel.send(embed)
  }
  }

 



  if (command.ownerOnly) {
    if(!owner.includes(message.author.id)) return;
     message.channel.send("ERROR 402")
}

  let uCooldown = cooldown[message.author.id];

  if (!uCooldown) {
    cooldown[message.author.id] = {}
    uCooldown = cooldown[message.author.id]
  }

  let time = uCooldown[command.name] || 0

  if (time && (time > Date.now())) return message.channel.send(`Use it in ${Math.ceil((time - Date.now()) / 1000)} seconds.`) 

  cooldown[message.author.id][command.name] = Date.now() + command.cooldown;

  
if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;

if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) return;



  if (command) command.run(client, message, args);
 


}}
