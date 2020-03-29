import { createAction } from '../../command';
import zen from './zen';

export default createAction(
  'your moment of zen',
  async (): Promise<void> => {
    const text = await zen();
    console.log(text);
  }
);
