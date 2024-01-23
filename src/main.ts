import ShaderProgram from "./setup";
import fragmentShaderSource from "./shaders/testUniforms/fragment.glsl?raw";
import vertexShaderSource from "./shaders/testUniforms/vertex.glsl?raw";
import "./style.css";

const main = () => {
  const canvas1 = document.querySelector<HTMLCanvasElement>("#targetCanvas1");
  const canvas2 = document.querySelector<HTMLCanvasElement>("#targetCanvas2");
  const canvas3 = document.querySelector<HTMLCanvasElement>("#targetCanvas3");
  if (!canvas1 || !canvas2 || !canvas3) throw new Error("canvas not found :(");
  new ShaderProgram(canvas1, vertexShaderSource, fragmentShaderSource);
  new ShaderProgram(canvas2, vertexShaderSource, fragmentShaderSource);
  new ShaderProgram(canvas3, vertexShaderSource, fragmentShaderSource);
};

main();
