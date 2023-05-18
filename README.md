# Simple Particle Animation
A simple and flexible particle animation component for websites.

[Live demo](https://edoardodanna.github.io/simple-particle-animation/)

## Basic usage
To add this animation to your website:
- Add the `particleEffect.js`to your website (e.g. under `scripts/`)
- Import the script in your HTML file, for instance:
    ```js
    <script src="scripts/particleEffect.js"></script>
    ```
- Call the `initScene()` function from javascript with a base64 encoded png, for example:
    ```js
    <script>
        window.initScene("iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII");
    </script>
    ```

## Configuration
