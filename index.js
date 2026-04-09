const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates]
});

client.commands = new Collection();

const fs = require('fs');
const commandFiles = fs.readdirSync('./src/commands');

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`✅ ${client.user.tag} online`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const cmd = client.commands.get(interaction.commandName);
  if (cmd) await cmd.execute(interaction);
});

client.login(process.env.TOKEN);