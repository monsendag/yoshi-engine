import execa from 'execa';

export function setup() {
  return Promise.resolve();
}

export function capture() {
  return execa('gphoto2', ['--set-config', 'capturetarget=1', '--trigger-capture']).then(result => {
      console.log(result.stdout);
      return result;
  });
}
