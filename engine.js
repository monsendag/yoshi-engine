import driver from './src/driver';
import camera from './src/camera';
import sleep from './src/sleep';

//so the program will not close instantly
process.stdin.resume();

function exitHandler(options, err) {
    if (options.cleanup) {
      console.log("Cleaning up gpio");
      driver.cleanup();
    }

    if (err) console.log(err.stack);
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
      await camera.capture();
      await sleep(5000);
      await driver.drive(10000);
    }

  })
  .then(() => {
    process.exit();
  });
