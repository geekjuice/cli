import { readdir, stat, Stats } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { Collected } from './types';

const root = join(__dirname, '../commands');

const filepath = (file: string): string => join(root, file);

const info = (file: string): Promise<Stats> => promisify(stat)(filepath(file));

const reducer = async (
  { commands, aliases }: Collected,
  file: string
): Promise<Collected> => {
  try {
    const {
      default: { command, alias, description },
    } = await import(filepath(file));

    return {
      commands: {
        ...commands,
        [file]: {
          command,
          ...(alias ? { alias } : {}),
          ...(description ? { description } : {}),
        },
      },
      aliases: {
        ...aliases,
        ...(alias ? { [alias]: file } : {}),
      },
    };
  } catch (error) {
    return { commands, aliases };
  }
};

let cached: Collected | null = null;

export default async (): Promise<Collected> => {
  if (cached === null) {
    const files = await promisify(readdir)(root);
    const stats = await Promise.all(files.map(info));
    const filtered = files.filter((file: string, index: number) =>
      stats[index].isDirectory()
    );
    cached = await filtered.reduce(
      (promise, file) => promise.then((memo) => reducer(memo, file)),
      Promise.resolve({ commands: {}, aliases: {} })
    );
  }
  return cached;
};
