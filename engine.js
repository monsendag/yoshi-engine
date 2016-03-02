import driver from './src/driver';
import camera from './src/camera';
import sleep from './src/sleep';
import log from './src/log';

//so the program will not close instantly
process.stdin.resume();

function exitHandler(options, err) {
    log.info('qutting yoshi-engine...')
    if (options.cleanup) {
      driver.cleanup();
    }

    if (err) log.error(err.stack);
    if (options.exit) process.exit();
}

// clean up when exiting
process.on('exit', exitHandler.bind(null, {cleanup: true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit: true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit: true}));

// capture ... drive ... capture ... drive ... capture
Promise.all(driver.setup(), camera.setup())
  .then(async function() {

    for(var i = 0; i < 10 i++) {
      log.debug('capturing!')
      await camera.capture();
      log.debug('waiting for 5 sec')
      await sleep(5000);
      log.debug('driving 10000 cycles')
      await driver.drive(10000);
    }

  })
  .then(() => {
    process.exit();
  });
