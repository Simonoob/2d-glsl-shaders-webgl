import { fragmentShaderSource } from "../shaders/fragment";
import { vertexShaderSource } from "../shaders/vertex";
import { createShader, createShaderProgram, resizeCanvas } from "./utils";

const setupRenderingCtx = (canvas: HTMLCanvasElement) => {
  const renderCtx = canvas.getContext("webgl");
  if (!renderCtx)
    throw new Error(
      "coundn't get the rendering context. your browser doesn't support webgl",
    );

  const vertexShader = createShader(
    renderCtx,
    vertexShaderSource,
    renderCtx.VERTEX_SHADER,
  );
  const fragmentShader = createShader(
    renderCtx,
    fragmentShaderSource,
    renderCtx.FRAGMENT_SHADER,
  );
  if (!fragmentShader || !vertexShader)
    throw new Error("coudn't create the shaders");
  const shaderProgram = createShaderProgram(
    renderCtx,
    vertexShader,
    fragmentShader,
  );
  if (!shaderProgram) throw new Error("condn't create the shader program");

  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

  const vertexBuffer = renderCtx.createBuffer();
  renderCtx.bindBuffer(renderCtx.ARRAY_BUFFER, vertexBuffer);
  renderCtx.bufferData(renderCtx.ARRAY_BUFFER, vertices, renderCtx.STATIC_DRAW);

  renderCtx.useProgram(shaderProgram);

  const positionLocation = renderCtx.getAttribLocation(
    shaderProgram,
    "a_position",
  );
  renderCtx.enableVertexAttribArray(positionLocation);

  renderCtx.bindBuffer(renderCtx.ARRAY_BUFFER, vertexBuffer);
  renderCtx.vertexAttribPointer(
    positionLocation,
    2,
    renderCtx.FLOAT,
    false,
    0,
    0,
  );

  window.addEventListener("resize", () => resizeCanvas(renderCtx, canvas));
  resizeCanvas(renderCtx, canvas);

  return renderCtx;
};

export default setupRenderingCtx;
