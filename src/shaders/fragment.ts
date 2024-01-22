export const fragmentShaderSource = `precision mediump float;

varying vec2 vUv;

uniform float u_ratio;
uniform float u_time;

void main() {
    vec2 uv = vUv;
    gl_FragColor = vec4(vec2(vUv), cos(u_time), 1.0);
}`;
