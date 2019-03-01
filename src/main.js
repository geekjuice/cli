const meow = require('meow');
const { magenta, blue, gray } = require('chalk');
const { getCommands } = require('./commands');

const spaces = length =>
  Array.from({ length })
    .map(() => ' ')
    .join('');

const indented = (commands, padding) =>
  Object.entries(commands)
    .map(
      ([name, { alias }]) =>
        `${blue(`${name}${alias ? ` (alias: ${alias})` : ''}`)}`
    )
    .join(`\n${padding}`);

module.exports = async () => {
  const { commands, aliases } = await getCommands();

  const {
    input: [input],
    showHelp,
  } = meow(
    `
    usage: ${magenta('cli')} ${blue('[command]')} [options]

    commands:
      ${
        Object.keys(commands).length
          ? indented(commands, spaces(6))
          : gray('no commands available')
      } `,
    {
      autoHelp: false,
    }
  );

  const isCommand = commands.hasOwnProperty(input);
  const isAlias = aliases.hasOwnProperty(input);

  if (!(isCommand || isAlias)) {
    showHelp();
  }

  const command = isCommand ? input : aliases[input];
  const { action } = commands[command];

  await action();
};
