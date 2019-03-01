const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const stat = file => promisify(fs.stat)(join(__dirname, file));

const consumer = ({ commands, aliases }, file) => {
  try {
    const command = require(join(__dirname, file));
    const { alias } = command;

    return {
      commands: {
        ...commands,
        [file]: {
          action: command,
          ...(alias ? { alias } : {}),
        },
      },
      aliases: {
        ...aliases,
        ...(alias ? { [alias]: file } : {}),
      },
    };
  } catch (error) {
    require('../error')(error);
    return { commands, aliases };
  }
};

exports.getCommands = async () => {
  const files = await promisify(fs.readdir)(__dirname);
  const stats = await Promise.all(files.map(stat));
  const filter = (file, index) => stats[index].isDirectory();
  return files.filter(filter).reduce(consumer, {
    commands: {},
    aliases: {},
  });
};
