import test from 'ava';
import {setup, capture} from '../src/camera';


test('capture single photo', t => {
    return setup()
      .then(() => {
        return capture();
      });
});
