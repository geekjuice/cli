export interface Parameters {
  [flag: string]: unknown;
}

export interface Action {
  action: (parameters: Parameters) => void | Promise<void>;
  description?: string;
  alias?: string;
}

export interface Command {
  alias?: string;
  command: () => void | Promise<void>;
  description?: string;
}

export interface Option {
  alias?: string;
  choices?: string[];
  default?: boolean | number | string;
  description?: string;
  type?: string;
}

export interface Collected {
  aliases: {
    [alias: string]: string;
  };
  commands: {
    [command: string]: Command;
  };
}

export interface ObjectOf<T> {
  [key: string]: T;
}
