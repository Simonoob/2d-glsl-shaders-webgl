import fragmentShaderSource from "./fragment.glsl?raw";
import vertexShaderSource from "./vertex.glsl?raw";
import GUI from "lil-gui";
import ShaderProgram from "../../utils/shaderProgram";

const main = (): void => {
  const gui = new GUI({
    width: Math.min(window.innerWidth, 600),
  });
  const params = {
    aspectRatio: "1/1",
  };
  const canvas = document.querySelector<HTMLCanvasElement>("#targetCanvas");

  if (canvas === null) throw new Error("canvas not found :(");

  gui
    .add(params, "aspectRatio", ["1/1", "3/5", "16/9"])
    .name("canvas aspect ratio")
    .onChange(() => {
      canvas.style.aspectRatio = params.aspectRatio;
      canvas.style.flex = "0";
      new ShaderProgram(canvas, vertexShaderSource, fragmentShaderSource);
    });

  canvas.style.aspectRatio = params.aspectRatio;

  new ShaderProgram(canvas, vertexShaderSource, fragmentShaderSource);
};

export default main;
