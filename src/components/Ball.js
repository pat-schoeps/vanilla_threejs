import Vector from '../components/Vector';
import { collisionVector } from '../utils/collisions';

export default class Ball {
  constructor(config) {
    Object.assign(this,
      {
        id: Math.floor(Math.random() * 1000000),
        type: 'circle',
        position: new Vector(40, 40),
        velocity: new Vector(5, 3),
        radius: 10,
        color: 'red',
        collisions: [],
      },
      config
    );
  }

  update(state, time, updateId) {

    // Check if hitting left or right of display
    if (this.position.x >= state.display.canvas.width || this.position.x <= 0) {
      this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    }

    // Check if hitting top or bottom of display
    if (this.position.y >= state.display.canvas.height || this.position.y <= 0) {
      this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    }

    for (let actor of state.actors) {

      /**
       * A ball can't collide with itself and
       * skip balls that have already collided.
       **/
      if (this === actor || this.collisions.includes(actor.id + updateId)) {
        continue;
      }

      const distance = this.position.subtract(actor.position).magnitude;

      if (distance <= this.radius + actor.radius) {
        const v1 = collisionVector(this, actor);
        const v2 = collisionVector(actor, this);
        this.velocity = v1;
        actor.velocity = v2;
        this.collisions.push(actor.id + updateId);
        actor.collisions.push(this.id + updateId);
      }
    }

    return new Ball({
      ...this,
      position: this.position.add(this.velocity),
    });
  }

  get sphereArea() {
    return 4 * Math.PI * this.radius ** 2;
  }
}