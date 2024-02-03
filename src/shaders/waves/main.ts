import fragmentShaderSource from './waves.glsl?raw'
import vertexShaderSource from '../basicVertex.glsl?raw'
import GUI from 'lil-gui'
import ShaderProgram from '../../utils/shaderProgram'

const attachShaderPrograms = (yFunction: string): ShaderProgram => {
  const canvas = document.querySelector<HTMLCanvasElement>('#targetCanvas')
  if (canvas === null) throw new Error('canvas not found :(')
  const processedFragmentShaderSource = fragmentShaderSource.replace(/<y_function>/g, yFunction)

  return new ShaderProgram(canvas, vertexShaderSource, processedFragmentShaderSource)
}

const main = (): void => {
  const gui = new GUI({
    width: Math.min(window.innerWidth, 600),
  })
  const params = {
    aspectRatio: '1/1',
    yFunction: 'sin(x/y - time)',
  }
  const canvas = document.querySelector<HTMLCanvasElement>('#targetCanvas')

  if (canvas === null) throw new Error('canvas not found :(')

  gui
    .add(params, 'yFunction')
    .name('y =')
    .onChange(() => {
      try {
        document.querySelector('#outputContainer')?.classList.remove('error')
        attachShaderPrograms(params.yFunction)
      } catch {
        document.querySelector('#outputContainer')?.classList.add('error')
      }
    })
  gui
    .add(params, 'aspectRatio', ['1/1', '3/5', '16/9'])
    .name('canvas aspect ratio')
    .onChange(() => {
      canvas.style.aspectRatio = params.aspectRatio
      canvas.style.flex = '0'
      attachShaderPrograms(params.yFunction)
    })

  canvas.style.aspectRatio = params.aspectRatio
  attachShaderPrograms(params.yFunction)
}

export default main
