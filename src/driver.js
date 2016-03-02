import GpioPin from 'gpio-promise';
import sleep from './sleep';
import log from './log';

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

var pins = null;

// acquire pins
export function setup() {
  log.debug('configuring driver');
  const pins = pinNumbers.map(n => new GpioPin(n));
  const promises = pins.map(pin => pin.out())
  return Promise.all(promises);
}

// release pins
export function cleanup() {
  log.debug('releasing gpio pins');
  const promises = pinNumbers.map(n => GpioPin.unexport(n));
  return Promise.all(promises).then(() => {
    pins = null;
  });
}

function set(states) {
    if(pins == null) {
      throw new Error("Pins have not been aquired yet. Please call setup() first.")
    }
    const promises = pins.map((pin, i) => pin.set(states[i]));
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
