import execa from 'execa';
import log from './log';

exports.setup = function() {
  log.debug('configuring camera');
  return Promise.resolve();
}

exports.capture = async function() {
  log.info('capturing photo');
  const result = await execa('gphoto2', ['--set-config', 'capturetarget=1', '--trigger-capture']);
  log.info(result.stdout);
  return result;
}
