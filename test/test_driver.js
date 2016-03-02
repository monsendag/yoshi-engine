import test from 'ava';
import {setup, drive} from '../src/driver';

test('drive 5000 steps', t => {
  return setup().then(() => {
    return drive(5000);
  });
});
