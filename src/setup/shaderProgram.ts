import { setupRenderingCtx } from "./utils";

class ShaderProgram {
  canvas: HTMLCanvasElement;
  vertexShaderSrc: string;
  fragmentShaderSrc: string;
  renderingCtx: WebGLRenderingContext;
  webGlProgram: WebGLProgram;
  devicePixelRatio: number;
  canvasSize: {
    width: number;
    height: number;
  };

  pointer: {
    x: number;
    y: number;
  };

  pointerThreshold: number;

  constructor(
    canvas: HTMLCanvasElement,
    vertexShaderSrc: string,
    fragmentShaderSrc: string,
  ) {
    this.canvas = canvas;
    this.vertexShaderSrc = vertexShaderSrc;
    this.fragmentShaderSrc = fragmentShaderSrc;
    this.devicePixelRatio = Math.min(window.devicePixelRatio, 2);

    const { renderingCtx, webGlProgram } = setupRenderingCtx(
      canvas,
      vertexShaderSrc,
      fragmentShaderSrc,
    );
    this.renderingCtx = renderingCtx;
    this.webGlProgram = webGlProgram;

    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
    this.resizeCanvas();

    this.pointer = {
      x: this.canvasSize.width / 2,
      y: this.canvasSize.height / 2,
    };

    canvas.addEventListener("mousemove", (e) => {
      this.updatePointerPosition(e.clientX, e.clientY);
    });
    canvas.addEventListener("touchmove", (e) => {
      this.updatePointerPosition(
        e.targetTouches[0].clientX,
        e.targetTouches[0].clientY,
      );
    });
    canvas.addEventListener("click", (e) => {
      this.updatePointerPosition(e.clientX, e.clientY);
    });

    this.render();
  }

  resizeCanvas = () => {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    this.canvasSize = {
      width,
      height,
    };
    this.canvas.width = width * this.devicePixelRatio;
    this.canvas.height = height * this.devicePixelRatio;
    this.renderingCtx.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.renderingCtx.uniform1f(
      this.renderingCtx.getUniformLocation(this.webGlProgram, "u_ratio"),
      this.canvas.width / this.canvas.height,
    );
    this.renderingCtx.uniform2f(
      this.renderingCtx.getUniformLocation(this.webGlProgram, "u_resolution"),
      this.canvas.width,
      this.canvas.height,
    );
  };

  updatePointerPosition = (clientX: number, clientY: number) => {
    // get position relative to the canvas dimensions
    const rect = this.canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = this.canvasSize.height - (clientY - rect.top);

    this.pointer.x = x;
    this.pointer.y = y;
  };

  render = () => {
    // time
    const currentTime = performance.now() / 1000;
    this.renderingCtx.uniform1f(
      this.renderingCtx.getUniformLocation(this.webGlProgram, "u_time"),
      currentTime,
    );

    // pointer
    const x = this.pointer.x;
    const y = this.pointer.y;

    const pointerNormalized = {
      x: x / this.canvasSize.width,
      y: y / this.canvasSize.height,
    };

    this.renderingCtx.uniform2f(
      this.renderingCtx.getUniformLocation(this.webGlProgram, "u_pointer"),
      pointerNormalized.x,
      pointerNormalized.y,
    );

    // draw
    this.renderingCtx.clearColor(0.0, 0.0, 0.0, 1.0);
    this.renderingCtx.clear(this.renderingCtx.COLOR_BUFFER_BIT);
    this.renderingCtx.drawArrays(this.renderingCtx.TRIANGLE_STRIP, 0, 4);

    // loop
    requestAnimationFrame(this.render);
  };
}

export default ShaderProgram;
