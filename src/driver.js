const sleep = require('./sleep');
const log = require('./log');
const wpi = require("wiring-pi");

// using GPIO mode for wiring PI
// http://wiringpi.com/reference/setup/
const pinNumbers = [17, 18, 27, 22];

// rotate stepper using the single step method
// http://www.lirtex.com/robotiacs/stepper-motor-controller-circuit/
const steps =
      [[1,1,0,0],
       [0,1,1,0],
       [0,0,1,1],
       [1,0,0,1]];

// acquire pins
exports.setup = function() {
  log.debug('configuring driver');
  wpi.setup('gpio');
  pinNumbers.forEach(n => wpi.pinMode(n, wpi.OUTPUT));
}

// release pins
exports.cleanup = function() {
  log.debug('clearing pins');
  set([0,0,0,0]);
}

exports.set = function(states) {
    pinNumbers.forEach((n,i) => wpi.digitalWrite(n, states[i]));
}

exports.drive = async function(counter) {
  while(counter > 0) {
      var i = counter % steps.length;
      await set(steps[i]);
      await sleep(1);
      counter -= 1;
  }

  // turn off all pins
  await set([0, 0, 0, 0]);
}
