import { Canvas } from './canvas/Canvas';
import State from './State';
import Ball from './components/Ball';
import Vector from './components/Vector';

import './stylesheets/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const display = new Canvas();
  const ball1 = new Ball({
    position: new Vector(40, 100),
    velocity: new Vector(1, 0),
    radius: 20,
  });

  const ball2 = new Ball({
    position: new Vector(200, 100),
    velocity: new Vector(-1, 0),
    color: 'blue',
  });

  const actors = [ball1, ball2];
  let state = new State(display, actors);

  runAnimation(time => {
    state = state.update(time);
    display.sync(state);
  });

  //requestAnimationFrame(scene.render);
});

const runAnimation = animation => {
  let lastTime = null;
  const frame = time => {
    if (lastTime !== null) {
      const timeStep = Math.min(100, time - lastTime) / 1000;

      // return false from animation to stop
      if (animation(timeStep) === false) {
        return;
      }
    }
    lastTime = time;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};