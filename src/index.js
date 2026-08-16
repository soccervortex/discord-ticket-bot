require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const ready = require("./events/ready.js");
const { loadCommands } = require("./handlers/commandHandler.js");
const interactionCreate = require("./events/interactionCreate.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once("clientReady", (c) => {
  ready(c);
});

client.on("interactionCreate", (interaction) => {
  interactionCreate(interaction, commands);
});

const commands = loadCommands();

client.login(process.env.TOKEN);
