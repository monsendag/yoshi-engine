import sleep from './sleep';
import log from './log';
import * as gpio from "pi-gpio-promise";

// BOARD numbering system (not BCM)
// https://sourceforge.net/p/raspberry-gpio-python/wiki/BasicUsage/
const pinNumbers = [11, 12, 13, 15];

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
  const promises = pinNumbers.map(n => gpio.open(n, "output"));
  return Promise.all(promises);
}

// release pins
export function cleanup() {
  log.debug('releasing gpio pins');
  const promises = pinNumbers.map(n => gpio.close(n));
  return Promise.all(promises);
}

function set(states) {
    // if(pins == null) {
    //   throw new Error("Pins have not been aquired yet. Please call setup() first.");
    // }
    const promises = pinNumbers.map((n, i) => gpio.write(n, states[i]));
    return Promise.all(promises);
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
