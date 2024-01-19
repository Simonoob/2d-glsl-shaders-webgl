import { WebGLRenderer, sRGBEncoding } from "three";

const setupEnv = (canvas: HTMLCanvasElement) => {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMappingExposure = 1.75;
  renderer.shadowMap.enabled = true;
  renderer.setSize(600, 600); //TODO: CHANGE ME
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

export default setupEnv;
