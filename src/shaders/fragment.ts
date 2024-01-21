export const fragmentShaderSource = `precision mediump float;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    gl_FragColor = vec4(uv, vec2(1.0));
}`;
