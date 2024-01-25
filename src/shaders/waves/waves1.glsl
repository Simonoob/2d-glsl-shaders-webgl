#ifdef GL_ES
precision mediump float;
#endif


varying vec2 vUv;

uniform float u_ratio;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;


// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st) {    
    return step(0.001, abs(st.y - st.x));
}

void main() {
  // ------------
  // setup:
  // transform coordinates so that 0 is in the middle
  // and adjust for the viewport ratio
  vec2 uv = vUv - 0.5;
  uv.x *= u_ratio;
  // ------------


  float distanceFromPoint = length(vec2(0.0) - uv);
  float circle = step(0.01, distanceFromPoint);

  // ------------
  // grid

  float xLine = plot(vec2(
    0.0,
    uv.y
  ));

  float xLineHalf = plot(vec2(
    0.25,
    uv.y
  ));

  float grid =
    // 0 -
    plot(vec2(0.0, uv.y))
    // .25 -
    * plot(vec2(0.25, uv.y))
    // -.25 -
    * plot(vec2(-0.25, uv.y))
    // 0 |
    * plot(vec2(0.0, uv.x))
    // .25 |
    * plot(vec2(0.25, uv.x))
    // -.25 |
    * plot(vec2(-0.25, uv.x));
  // ------------

  vec3 color = vec3(
    grid * circle
  );




	gl_FragColor = vec4(color,1.0);
}



