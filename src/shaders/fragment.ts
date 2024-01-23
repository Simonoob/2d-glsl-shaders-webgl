export const fragmentShaderSource = `precision mediump float;

varying vec2 vUv;

uniform float u_ratio;
uniform float u_time;
uniform vec2 u_pointer;



void main() {

    vec2 diffWithDirection = u_pointer - vUv;
    // adjust for aspect ratio
    diffWithDirection.x *= u_ratio;

    float distanceFromPointer = length(diffWithDirection);


    // limit radius and make value bool (1 or 0)
    distanceFromPointer = step(0.01, distanceFromPointer + (cos(u_time) * 0.01));


    vec3 color = vec3(vUv, distanceFromPointer);

    gl_FragColor = vec4(color, 1.0);
}`;
