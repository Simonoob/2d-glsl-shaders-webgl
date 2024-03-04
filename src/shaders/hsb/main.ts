import fragmentShaderSource from "./hsb.glsl?raw";
import vertexShaderSource from "../basicVertex.glsl?raw";
import ShaderProgram from "../../utils/shaderProgram";
import { Pane } from "tweakpane";

const attachShaderPrograms = (): ShaderProgram => {
  const canvas = document.querySelector<HTMLCanvasElement>("#targetCanvas");
  if (canvas === null) throw new Error("canvas not found :(");

  return new ShaderProgram(canvas, vertexShaderSource, fragmentShaderSource);
};

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
      attachShaderPrograms();
    });

  canvas.style.aspectRatio = params.aspectRatio;
  attachShaderPrograms();
};

export default main;
