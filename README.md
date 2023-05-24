# Simple Particle Animation

A simple and flexible Javascript particle animation script for websites.

![Simple demo gif showing a red heart with a particle effect](assets/demo.gif)

[Live demo](https://edoardodanna.github.io/simple-particle-animation/)

## Basic usage

To add this animation to your website:

- Add the `particleEffect.js` to your website (e.g. under `scripts/`)
- Import the script in your HTML file, for instance:
  ```js
  <script src="scripts/particleEffect.js"></script>
  ```
- Include a `canvas` tag with the following callbacks:
  ```html
  <canvas
    id="scene"
    onmouseover="mouseStatus(true);"
    onmouseout="mouseStatus(false);"
  ></canvas>
  ```
- Call the `initScene()` function from Javascript with a base64 encoded png, for example:
  ```js
  <script>
    window.initScene("iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII");
  </script>
  ```

Note that the script will use the provided image's alpha channel (transparency) to draw the particle effect. For the best effect, stick with png images depicting simple shapes (e.g. a heart) where everything outside of the image is set to full transparency (i.e. alpha = 0).

## Configuration

There are several configurable option in the animation.

These can be set by calling `window.updateConfig({ newConfigDict });`. For instance, to change the base color, you might call:

```js
window.updateConfig({ particleColor: color });
```

#### particleColor

Controls the base color of the particles. Provided as RGB.
Defaults to [150, 190, 195].

#### colorNoise

Controls the random brightness variability around the base color. A value of 0 means all the particles are the exact same color.
Defaults to 80.

#### particleFriction

Controls the amount of friction experienced by the particles. 0 means particles never stop. High values will cause particles to reach their minimum speed very quickly.
Defaults to 0.18.

#### particleFrictionNoise

Controls the random variability around the particleFriction value. Adding some variability makes the animation look more organic.
Defaults to 0.05.

#### mouseAvoidanceStrength

Controls the how strongly particles are repulsed by the mouse.
Defaults to 2.

#### mouseAvoidanceStrengthNoise

Controls the random variability around the mouseAvoidanceStrength value. Adding some variability makes the animation look more organic.
Defaults to 2.

#### mouseAvoidanceDistance

Controls the distance from the mouse where particles start feeling an effect.
Defaults to 50.

#### mouseAvoidanceDistanceNoise

Controls the random variability around the mouseAvoidanceDistance value. Adding some variability makes the animation look more organic.
Defaults to 50.
