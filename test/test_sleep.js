const sleep = require('../src/sleep');

async function doo() {
  console.log('a');
  await sleep(2000);
  console.log('b');
};

doo();
