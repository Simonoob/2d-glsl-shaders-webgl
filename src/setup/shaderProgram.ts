import { setupRenderingCtx } from "./utils";

class ShaderProgram {
  canvas: HTMLCanvasElement;
  vertexShaderSrc: string;
  fragmentShaderSrc: string;
  renderingCtx: WebGLRenderingContext;
  webGlProgram: WebGLProgram;

  constructor(
    canvas: HTMLCanvasElement,
    vertexShaderSrc: string,
    fragmentShaderSrc: string,
  ) {
    this.canvas = canvas;
    this.vertexShaderSrc = vertexShaderSrc;
    this.fragmentShaderSrc = fragmentShaderSrc;

    const { renderingCtx, webGlProgram } = setupRenderingCtx(
      canvas,
      vertexShaderSrc,
      fragmentShaderSrc,
    );
    this.renderingCtx = renderingCtx;
    this.webGlProgram = webGlProgram;

    window.addEventListener("resize", () => this.resizeCanvas());
    this.resizeCanvas();

    this.render();
  }

  resizeCanvas() {
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.width = width * devicePixelRatio;
    this.canvas.height = height * devicePixelRatio;
    this.renderingCtx.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.renderingCtx.uniform1f(
      this.renderingCtx.getUniformLocation(this.webGlProgram, "u_ratio"),
      this.canvas.width / this.canvas.height,
    );
    console.log("marameo");
  }

  render = () => {
    this.renderingCtx.clearColor(0.0, 0.0, 0.0, 1.0);
    this.renderingCtx.clear(this.renderingCtx.COLOR_BUFFER_BIT);
    this.renderingCtx.drawArrays(this.renderingCtx.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(this.render);
  };
}

export default ShaderProgram;
