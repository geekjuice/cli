import chalk from 'chalk';
import meow from 'meow';
import readPkgUp from 'read-pkg-up';
import collect from './base/collect';
import * as flags from './base/flags';
import * as list from './base/list';
import { print } from './base/print';

const { blue, cyan, gray, magenta, red } = chalk;

const defaults = {
  ...flags.help,
  ...flags.version,
};

(async (): Promise<void> => {
  try {
    const result = await readPkgUp();
    const { packageJson: { description = '' } = {} } = result || {};

    const { commands, aliases } = await collect();

    const {
      input: [input],
      flags: { help, version },
      showHelp,
      showVersion,
    } = meow(
      `
      usage: ${magenta('style')} ${cyan('[command]')} ${blue('[options]')}

      commands:
        ${await list.commands()}

      options:
        ${await list.options(defaults)}`,
      {
        autoHelp: false,
        autoVersion: false,
        description: gray(`[${description}]`),
        flags: flags.sanitize(defaults),
      }
    );

    if (!input && help) {
      showHelp();
    } else if (version) {
      showVersion();
    }

    if (!(commands?.[input] || aliases?.[input])) {
      if (input) {
        print(red(`${input}?...`));
      } else {
        print(red(`zzz...`));
      }
      showHelp();
    }

    const name = aliases?.[input] ?? input;
    const { command } = commands[name];

    await command();

    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      print(red(error.message));
    }

    print(red('(╯°□°)╯︵ ┻━┻'));
    process.exit(1);
  }
})();
