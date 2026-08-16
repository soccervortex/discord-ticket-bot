require("dotenv").config();

const { REST, Routes } = require("discord.js");
const { loadCommands } = require("./handlers/commandHandler.js");

const commands = loadCommands();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

async function deployCommands() {
  try {
    console.log("Slash commands worden geregistreerd...");

    const commandData = [];

    for (const command of commands.values()) {
      commandData.push(command.data.toJSON());
    }

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
      { body: commandData },
    );

    console.log("Slash commands succesvol geregistreerd!");
  } catch (error) {
    console.error(error);
  }
}

deployCommands();
