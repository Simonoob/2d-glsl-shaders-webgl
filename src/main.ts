import setupRenderingCtx from "./setup";
import "./style.css";

const main = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#targetCanvas");
  if (!canvas) throw new Error("canvas not found :(");

  const renderingCtx = setupRenderingCtx(canvas);
  const render = () => {
    renderingCtx.clearColor(0.0, 0.0, 0.0, 1.0);
    renderingCtx.clear(renderingCtx.COLOR_BUFFER_BIT);
    renderingCtx.drawArrays(renderingCtx.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(render);
  };

  render();
};

main();
