import sleep from './sleep';
import log from './log';
import * as wpi from "wiring-pi";

// BOARD numbering system (not BCM)
// https://sourceforge.net/p/raspberry-gpio-python/wiki/BasicUsage/
// const pinNumbers = [11, 12, 13, 15];
const pinNumbers = [17, 18, 21, 22];

// rotating x steps using the single step method
// http://www.lirtex.com/robotiacs/stepper-motor-controller-circuit/
const steps =
      [[1,1,0,0],
       [0,1,1,0],
       [0,0,1,1],
       [1,0,0,1]];

// acquire pins
export function setup() {
  log.debug('configuring driver');

  wpi.setup('gpio');

  pinNumbers.forEach(n => wpi.pinMode(n, wpi.OUTPUT));

  return Promise.resolve();
  // const promises = pinNumbers.map(n => gpio.open(n, "output"));
  // return Promise.all(promises);
}

// release pins
export function cleanup() {
  log.debug('releasing gpio pins');
  // const promises = pinNumbers.map(n => gpio.close(n));
  // return Promise.all(promises);
  return Promise.resolve();
}

function set(states) {
    // if(pins == null) {
    //   throw new Error("Pins have not been aquired yet. Please call setup() first.");
    // }

    pinNumbers.forEach((n,i) => wpi.digitalWrite(n, states[i]));
    return Promise.resolve();

    // const promises = pinNumbers.map((n, i) => gpio.write(n, states[i]));
    // return Promise.all(promises);
}

export async function drive(counter) {
  while(counter > 0) {
      var i = counter % steps.length;
      await set(steps[i]);
      await sleep(3);
      counter -= 1;
  }

  // turn off all pins
  await set([0, 0, 0, 0]);
}
