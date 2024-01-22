export const createShader = (
  gl: WebGLRenderingContext,
  sourceCode: string,
  type: number,
) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("coundn't create the shader");
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader),
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export const createShaderProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLProgram,
  fragmentShader: WebGLProgram,
) => {
  const program = gl.createProgram();
  if (!program) throw new Error("can't create the shader program");
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(program),
    );
    return null;
  }

  return program;
};

export const resizeCanvas = (
  renderingCtx: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
) => {
  const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
  const sideLength = Math.min(window.innerWidth, window.innerHeight) * 0.8;
  canvas.style.width = `${sideLength}px`;
  canvas.style.height = `${sideLength}px`;
  canvas.width = sideLength * devicePixelRatio;
  canvas.height = sideLength * devicePixelRatio;
  renderingCtx.viewport(0, 0, canvas.width, canvas.height);
  // gl.uniform1f(uniforms.u_ratio, uniforms.width / canvasEl.height);
};
