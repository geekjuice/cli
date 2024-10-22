import { join } from 'path';

try {
  const path = join(__dirname, '../../.env');
  require('dotenv').config({ path });
} catch (error) {} // eslint-disable-line no-empty

const {
  env: { NODE_ENV, DEBUG },
} = process;

export { NODE_ENV, DEBUG };
