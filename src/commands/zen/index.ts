import { createCommand, createName } from '../../command';
import Default from './default';

export default createCommand({
  name: createName(__filename),
  description: 'moment of zen',
  alias: 'z',
  actions: {
    default: Default,
  },
});
