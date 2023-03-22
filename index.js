const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')

client.on('ready', () => {
  console.log(`${client.user.username} is now online!`)
})

client.on('message', async message => {
  if (message.author.bot) return; // ignore messages from bots
  
  if (message.content === `${prefix}verify`) { //Using the message.content command so that it's easy and stable
    if(message.channel.id === "YOUR VERIFICATION CHANNEL ID") { // Questions will send in this channel only
      
      // YOU CAN CHANGE THE QUESTIONS THOUGH
      
      // Bot will ask your name
      message.channel.sendTyping() // The bot will be starting typing in the channel
      const wait = require('util').promisify(setTimeout);
      await wait(5000)
      await message.channel.send("Name?"); // This message will sent in 5seconds
      const nameResponse = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
      const name = nameResponse.first().content;
      message.channel.send('Wait')
      message.channel.stopTyping()
      
      // Bot will ask your age
      message.channel.startTyping()
      await wait(5000)
      await message.channel.send("Age?");
      const ageResponse = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
      const age = ageResponse.first().content;
      message.channel.send('Wait')
      message.channel.stopTyping()

      // Bot will ask your gender
      message.channel.startTyping()
      await wait(5000)
      await message.channel.send("Gender?");
      const emailResponse = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
      const gender = emailResponse.first().content;
      message.channel.send('Wait')
      message.channel.stopTyping()

      // Bot will ask your location
      message.channel.startTyping()
      await wait(5000)
      await message.channel.send("Location?");
      const phoneResponse = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
      const location = phoneResponse.first().content;
      message.channel.send('Wait')
      message.channel.stopTyping()
      
      // Bot will send the user's answers to the mod logs channel
      const modLogsChannel = client.channels.cache.get(config.modLogsChannelId);
      const answers = new Discord.MessageEmbed()
      .setTitle("Verification")
      .setColor('#313138')
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addField('Status:', '```Verified!```')
      .addField('Name:', `\`${name}\``)
      .addField('Age:', `\`${age}\``)
      .addField('Gender:', `\`${gender}\``)
      .addField('Location:', `\`${location}\``)
      modLogsChannel.send(answers)

      // send a confirmation message to the user
      const role = message.guild.roles.cache.find(role => role.id === 'THE ROLE ID OF VERIFY');
      await wait(5000)
      await message.channel.send('Thank you for your answers. You will be verified shortly.');
      await message.member.roles.add(role) // The bot will give the user the role
      await message.author.send('Welcome to the server, Add mo friends mo dito have fun enjoying the server!')
      await wait(5000)
      message.channel.bulkDelete(15) // The bot will delete the message
    }
  }
})

client.login(config.token) // Start the bot, Online
