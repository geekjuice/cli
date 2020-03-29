import { AnyFlags } from 'meow';
import { Option, ObjectOf } from './types';

export const help = {
  help: {
    alias: 'h',
    description: 'show help',
    type: 'boolean',
  },
};

export const version = {
  version: {
    alias: 'v',
    description: 'show version',
    type: 'boolean',
  },
};

export const sanitize = (options: ObjectOf<Option>): AnyFlags =>
  Object.entries(options).reduce(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (omitted, [name, { choices, description, ...valid }]) => ({
      ...omitted,
      [name]: valid,
    }),
    {}
  );
