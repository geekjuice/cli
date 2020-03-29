import { basename, dirname } from 'path';
import chalk from 'chalk';
import meow from 'meow';
import * as flags from './base/flags';
import * as list from './base/list';
import { print } from './base/print';
import { Action, Command, Option, ObjectOf } from './base/types';

const { blue, cyan, gray, magenta, red } = chalk;

interface CommandOptions {
  name: string;
  alias?: string;
  description?: string;
  actions?: ObjectOf<Action>;
  options?: ObjectOf<Option>;
}

export const createName = (file: string): string => basename(dirname(file));

export const createCommand = ({
  name,
  alias,
  description,
  actions = {},
  options = {},
}: CommandOptions): Command => ({
  alias,
  description,
  command: async (): Promise<void> => {
    const merged = { ...flags.help, ...options };

    const {
      input: [input = 'default'],
      flags: { help, ...rest },
      showHelp,
    } = meow(
      `
      usage: ${magenta(name)} ${cyan('action')} ${blue('[options]')}

      actions:
        ${await list.actions(actions)}

      options:
        ${await list.options(merged)}`,
      {
        argv: process.argv.slice(3),
        autoHelp: false,
        autoVersion: false,
        description: gray(`[${description}]`),
        flags: flags.sanitize(merged),
      }
    );

    if (help) {
      showHelp();
    }

    if (!actions?.[input]) {
      if (input !== 'default') {
        print(red(`${input}?...`));
      } else {
        print(red(`zzz...`));
      }
      showHelp();
    }

    await actions[input]?.action(rest);

    process.exit(0);
  },
});

export const createAction = (
  description: string,
  action: Action['action']
): Action => ({
  description,
  action,
});
