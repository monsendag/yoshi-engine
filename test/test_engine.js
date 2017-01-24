import * as engine from '../src/engine';

const camera = {
  setup() {
    console.log('camera init');
    return Promise.resolve(); },
  capture() { return Promise.resolve(); }
};

const driver = {
  setup() {
    console.log('driver init');
    return Promise.resolve(); },
  drive() { return Promise.resolve(); }
};

engine.drive(camera, driver);
