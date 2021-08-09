const { MessageEmbed } = require('discord.js')
const arrayUtils = require('../../paras/ArrayUtil')

module.exports = {
  name: "queue",
  aliases: ["q"],
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
  
  run: async (client, message) => {
  const player = message.client.manager.players.get(message.guild.id)
  const color = message.guild.me.roles.highest.color

  if (!player) {
    let embed = new MessageEmbed()
      .setColor("RED")
      .setDescription("No songs were played.")
    return message.channel.send(embed)
  }

  let songs = player.queue.map(track => track.title)

  let songsForPageContent = []
  var selectedPage = 1
  let page = arrayUtils.getPage(songs.length)
  var auxArray = arrayUtils.mapRawArrayAndMakeObjectArray(songs)
  var songsForPage = arrayUtils.choosePage(auxArray, selectedPage)

  songsForPage.map(response => {
    songsForPageContent.push(`${response.index}) ${response.song}`)
  })

  if (player.queue.length <= 0) songs = null

  if (songs === null) {
    songsForPageContent = ``
    return message.channel.send(` \` NOW PLAYING - ${player.queue.current.title}\` \`\`\`\n${songsForPageContent}\`\`\` `)//1
  }

  if (page === 1) {
    return message.channel.send(`\`NOW PLAYING: ${player.queue.current.title}\` \`\`\`\n${songsForPageContent.join('\n')}\`\`\` `)//2
  }

  const msg = await message.channel.send(`\` NOW PLAYING - ${player.queue.current.title}\` \`\`\`\n${songsForPageContent.join('\n')}\`\`\` `)//3
  await msg.react('⬅️')
  await msg.react('➡️')

  const filtroForward = (r, u) => r.emoji.name === '➡️' && u.id === message.author.id
  const coletorForward = msg.createReactionCollector(filtroForward, { dispose: true })

  const filtroBackward = (r, u) => r.emoji.name === '⬅️' && u.id === message.author.id
  const coletorBackward = msg.createReactionCollector(filtroBackward, { dispose: true })

  coletorForward.on('collect', () => forward())
  coletorForward.on('remove', () => forward())

  coletorBackward.on('collect', () => backward())
  coletorBackward.on('remove', () => backward())

  function forward() {
    if (selectedPage === page) {
      selectedPage = 1;
      songsForPageContent = []
    } else {
      selectedPage++
      songsForPageContent = []
    }

    auxArray = arrayUtils.mapRawArrayAndMakeObjectArray(songs)
    songsForPage = arrayUtils.choosePage(auxArray, selectedPage)

    songsForPage.map(response => {
      songsForPageContent.push(`${response.index}) ${response.song}`)
    })

    msg.edit(`\`NOW PLAYING :- ${player.queue.current.title}\` \`\`\`\n${songsForPageContent.join('\n')}\`\`\` `)//4
  }

  function backward() {
    if (selectedPage === 1) {
      selectedPage = page;
      songsForPageContent = []
    } else {
      selectedPage--
      songsForPageContent = []
    }

    auxArray = arrayUtils.mapRawArrayAndMakeObjectArray(songs)
    songsForPage = arrayUtils.choosePage(auxArray, selectedPage)

    songsForPage.map(response => {
      songsForPageContent.push(`${response.index}) ${response.song}`)
    })

    msg.edit(`\`NOW PLAYING :- ${player.queue.current.title}\` \`\`\`\n${songsForPageContent.join('\n')}\`\`\` `)//5
  }
}}