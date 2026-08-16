const fs = require("fs");
const path = require("path");

function loadCommands() {
  const commands = new Map();

  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    commands.set(command.data.name, command);
  }

  return commands;
}

module.exports = { loadCommands };
