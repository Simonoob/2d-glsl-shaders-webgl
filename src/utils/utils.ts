export const createShader = (gl: WebGLRenderingContext, sourceCode: string, type: number) => {
  const shader = gl.createShader(type)
  if (!shader) throw new Error("coundn't create the shader")
  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

export const createShaderProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLProgram,
  fragmentShader: WebGLProgram,
) => {
  const program = gl.createProgram()
  if (!program) throw new Error("can't create the shader program")
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program))
    return null
  }

  return program
}

export const setupRenderingCtx = (
  canvas: HTMLCanvasElement,
  vertexShaderSource: string,
  fragmentShaderSource: string,
) => {
  const renderingCtx = canvas.getContext('webgl')
  if (!renderingCtx) throw new Error("coundn't get the rendering context. your browser doesn't support webgl")

  const vertexShader = createShader(renderingCtx, vertexShaderSource, renderingCtx.VERTEX_SHADER)
  const fragmentShader = createShader(renderingCtx, fragmentShaderSource, renderingCtx.FRAGMENT_SHADER)
  if (!fragmentShader || !vertexShader) throw new Error("coudn't create the shaders")
  const webGlProgram = createShaderProgram(renderingCtx, vertexShader, fragmentShader)
  if (!webGlProgram) throw new Error("condn't create the shader program")

  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])

  const vertexBuffer = renderingCtx.createBuffer()
  renderingCtx.bindBuffer(renderingCtx.ARRAY_BUFFER, vertexBuffer)
  renderingCtx.bufferData(renderingCtx.ARRAY_BUFFER, vertices, renderingCtx.STATIC_DRAW)

  renderingCtx.useProgram(webGlProgram)

  const positionLocation = renderingCtx.getAttribLocation(webGlProgram, 'a_position')
  renderingCtx.enableVertexAttribArray(positionLocation)

  renderingCtx.bindBuffer(renderingCtx.ARRAY_BUFFER, vertexBuffer)
  renderingCtx.vertexAttribPointer(positionLocation, 2, renderingCtx.FLOAT, false, 0, 0)

  return { renderingCtx, webGlProgram }
}
