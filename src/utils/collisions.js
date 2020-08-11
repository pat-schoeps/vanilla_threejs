export const collisionVector = (b1, b2) => {
  return b1.velocity

    // Take away from the starting velocity
    .subtract(

      // Subtract the positions
      b1.position
      .subtract(b2.position)

      /**
       * Multiply by the dot product of
       * the difference between the velocity
       * and position of both vectors
       **/
      .multiply(
        b1.velocity
        .subtract(b2.velocity)
        .dotProduct(
          b1.position
          .subtract(b2.position)
        )
        / b1.position
        .subtract(b2.position)
        .magnitude ** 2
      )

      /**
       * Multiply by the amount of mass the
       * object represents in the collision.
       **/
      .multiply(
        (2 * b2.sphereArea)
        / (b1.sphereArea + b2.sphereArea)
      )
    );
};