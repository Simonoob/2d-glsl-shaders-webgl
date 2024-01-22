import ShaderProgram from "./setup";
import { fragmentShaderSource } from "./shaders/fragment";
import { vertexShaderSource } from "./shaders/vertex";
import "./style.css";

const main = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#targetCanvas");
  if (!canvas) throw new Error("canvas not found :(");
  new ShaderProgram(canvas, vertexShaderSource, fragmentShaderSource);
};

main();
