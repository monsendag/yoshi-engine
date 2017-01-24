const test = require('ava');
const {setup, capture} = require('../src/camera');


test('capture single photo', t => {
    return setup()
      .then(() => {
        return capture();
      });
});
