import log from './log';
import sleep from './sleep';

export function drive(camera, driver) {
  return Promise
  .all([camera.setup(), driver.setup()])
  .then(async function() {
    for(var i = 0; i < 10; i++) {
      log.debug('capturing!');
      await camera.capture();
      log.debug('waiting for 5 sec');
      await sleep(5000);
      log.debug('driving 10000 cycles');
      await driver.drive(10000);
    }
  });
}
