import test from 'ava';
import {setup, captureImage} from '../src/camera';


test('capture single photo', t => {
    return setup()
      .then(() => {
        return capture();
      });
});
