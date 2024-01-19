import setupEnv from "./setup";
import "./style.css";

const main = () => {
  console.log("main func");
  const canvas = document.querySelector("#targetCanvas");
  if (!canvas) throw new Error("canvas not found :(");

  setupEnv(canvas);
};

main();
