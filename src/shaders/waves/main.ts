import fragmentShaderSource from "./waves.glsl?raw";
import vertexShaderSource from "../basicVertex.glsl?raw";
import ShaderProgram from "../../utils/shaderProgram";
import { Pane } from "tweakpane";

const attachShaderPrograms = (yFunction: string): ShaderProgram => {
  const canvas = document.querySelector<HTMLCanvasElement>("#targetCanvas");
  if (canvas === null) throw new Error("canvas not found :(");
  const processedFragmentShaderSource = fragmentShaderSource.replace(
    /<y_function>/g,
    yFunction,
  );

  return new ShaderProgram(
    canvas,
    vertexShaderSource,
    processedFragmentShaderSource,
  );
};

const main = (): void => {
  const gui = new Pane();
  const params = {
    aspectRatio: "1/1",
    yFunction: "sin(x/y - time)",
  };
  const canvas = document.querySelector<HTMLCanvasElement>("#targetCanvas");

  if (canvas === null) throw new Error("canvas not found :(");

  gui
    .addBinding(params, "yFunction", {
      label: "y =",
    })
    .on("change", () => {
      try {
        document.querySelector("#outputContainer")?.classList.remove("error");
        attachShaderPrograms(params.yFunction);
      } catch {
        document.querySelector("#outputContainer")?.classList.add("error");
      }
    });
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
      attachShaderPrograms(params.yFunction);
    });

  canvas.style.aspectRatio = params.aspectRatio;
  attachShaderPrograms(params.yFunction);
};

export default main;
