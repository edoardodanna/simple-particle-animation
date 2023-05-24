let base64Img =
  "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII";
window.initScene(base64Img);
const imgInput = document.querySelector("#file");

imgInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = function () {
      base64Img = reader.result.replace("data:image/png;base64,", "");
      window.initScene(base64Img);
    };
    reader.readAsDataURL(file);
  }
});

const colorInput = document.querySelector("#color");
colorInput.addEventListener("change", function () {
  const color = hexToRgb(this.value);
  window.updateConfig({ particleColor: color });
  window.initScene(base64Img);
});

const colorNoiseInput = document.querySelector("#colorNoise");
colorNoiseInput.addEventListener("change", function () {
  const colorNoise = parseInt(this.value, 10);
  window.updateConfig({ colorNoise: colorNoise });
  window.initScene(base64Img);
});

const mouseAvoidanceStrengthInput = document.querySelector(
  "#mouseAvoidanceStrength"
);
mouseAvoidanceStrengthInput.addEventListener("change", function () {
  const mouseAvoidanceStrength = parseFloat(this.value);
  window.updateConfig({ mouseAvoidanceStrength: mouseAvoidanceStrength });
  window.initScene(base64Img);
});
const mouseAvoidanceStrengthNoiseInput = document.querySelector(
  "#mouseAvoidanceStrengthNoise"
);
mouseAvoidanceStrengthNoiseInput.addEventListener("change", function () {
  const mouseAvoidanceStrengthNoise = parseFloat(this.value);
  window.updateConfig({
    mouseAvoidanceStrengthNoise: mouseAvoidanceStrengthNoise,
  });
  window.initScene(base64Img);
});

const mouseAvoidanceDistanceInput = document.querySelector(
  "#mouseAvoidanceDistance"
);
mouseAvoidanceDistanceInput.addEventListener("change", function () {
  const mouseAvoidanceDistance = parseInt(this.value, 10);
  window.updateConfig({ mouseAvoidanceDistance: mouseAvoidanceDistance });
  window.initScene(base64Img);
});
const mouseAvoidanceDistanceNoiseInput = document.querySelector(
  "#mouseAvoidanceDistanceNoise"
);
mouseAvoidanceDistanceNoiseInput.addEventListener("change", function () {
  const mouseAvoidanceDistanceNoise = parseInt(this.value, 10);
  window.updateConfig({
    mouseAvoidanceDistanceNoise: mouseAvoidanceDistanceNoise,
  });
  window.initScene(base64Img);
});

const particleFrictionInput = document.querySelector("#particleFriction");
particleFrictionInput.addEventListener("change", function () {
  const particleFriction = parseFloat(this.value);
  window.updateConfig({ particleFriction: particleFriction });
  window.initScene(base64Img);
});
const particleFrictionNoiseInput = document.querySelector(
  "#particleFrictionNoise"
);
particleFrictionNoiseInput.addEventListener("change", function () {
  const particleFrictionNoise = parseFloat(this.value);
  window.updateConfig({ particleFrictionNoise: particleFrictionNoise });
  window.initScene(base64Img);
});

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}
