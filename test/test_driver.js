const test = require('ava');
const {setup, drive} = require('../src/driver');

test('drive 5000 steps', t => {
  return setup().then(() => {
    return drive(5000);
  });
});
