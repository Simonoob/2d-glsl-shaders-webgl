import fragmentShaderSource from "./fragment.glsl?raw";
import vertexShaderSource from "./vertex.glsl?raw";
import ShaderProgram from "../../utils/shaderProgram";
import { Pane } from "tweakpane";

const main = (): void => {
  const gui = new Pane();
  const params = {
    aspectRatio: "1/1",
  };
  const canvas = document.querySelector<HTMLCanvasElement>("#targetCanvas");

  if (canvas === null) throw new Error("canvas not found :(");

  gui
    .addBinding(params, "aspectRatio", {
      label: "aspect ratio",
      options: {
        "1/1": "1/1",
        "3/5": "3/5",
        "16/9": "16/9",
      },
    })
    .on("change", () => {
      canvas.style.aspectRatio = params.aspectRatio;
      canvas.style.flex = "0";
      new ShaderProgram(canvas, vertexShaderSource, fragmentShaderSource);
    });

  canvas.style.aspectRatio = params.aspectRatio;

  new ShaderProgram(canvas, vertexShaderSource, fragmentShaderSource);
};

export default main;
