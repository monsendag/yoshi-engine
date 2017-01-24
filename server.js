const driver = require('./src/driver');
const camera = require('./src/camera');
const engine = require('./src/engine');

const sleep = require('./src/sleep');
const log = require('./src/log');

// so the program will not close instantly
process.stdin.resume();

function exitHandler(options, err) {
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


engine.drive(camera, driver);
