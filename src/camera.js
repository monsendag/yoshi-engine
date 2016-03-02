import execa from 'execa';
import log from './log';

export function setup() {
  log.debug('configuring camera');
  return Promise.resolve();
}

export function capture() {
  log.info('capturing photo');
  return execa('gphoto2', ['--set-config', 'capturetarget=1', '--trigger-capture']).then(result => {
      log.info(result.stdout);
      return result;
  });
}
