export const fragmentShaderSource = `precision mediump float;

varying vec2 vUv;

uniform float u_ratio;

void main() {
    vec2 uv = vUv;
    gl_FragColor = vec4(uv, u_ratio, 1.0);
}`;
