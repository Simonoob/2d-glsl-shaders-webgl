#define PI 3.1415926535897932384626433832795

#ifdef GL_ES
precision mediump float;
#endif
const int scaleMultiplier = 3;

varying vec2 vUv;

uniform float u_ratio;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;


// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float thickness) {    
    return smoothstep(thickness-0.01, thickness, abs(st.y - st.x)) * smoothstep(thickness, thickness+0.01, abs(st.y - st.x));
}

float plotSimple(vec2 st) {    
    return plot(st, 0.003);
}

void main() {
  // ------------
  // setup:
  // transform coordinates so that 0 is in the middle
  // and adjust for the viewport ratio
  vec2 uv = vUv - 0.5;
  uv.x *= u_ratio;
  uv*=float(scaleMultiplier)*2.0;
  // ------------


  // ------------
  // grid
  float grid = 1.0; //init grid to neutral value 

  for(int i=0;i<=scaleMultiplier;i++){
    grid *=
    // .5 -
    plotSimple(vec2(float(i) + 0.5, uv.y))
    // -.5 -
    * plotSimple(vec2(-(float(i) + 0.5), uv.y))
    // .5 |
    * plotSimple(vec2(float(i) + 0.5, uv.x))
    // -.5 |
    * plotSimple(vec2(-(float(i) + 0.5), uv.x));

    grid *=
    // 1 -
    plotSimple(vec2(float(i), uv.y))
    // -1 -
    * plotSimple(vec2(-float(i), uv.y))
    // 1 |
    * plotSimple(vec2(float(i), uv.x))
    // -1 |
    * plotSimple(vec2(-float(i), uv.x));


    // ------------
    // circle
    float distanceFromPointY = length(vec2(0.0, float(i)) - uv);
    float circleY = smoothstep(0.03, 0.04, distanceFromPointY);

    float distanceFromPointYneg = length(vec2(0.0, -float(i)) - uv);
    float circleYneg = smoothstep(0.03, 0.04, distanceFromPointYneg);
    grid*=circleY*circleYneg;


    float distanceFromPointX = length(vec2(float(i), 0.0) - uv);
    float circleX = smoothstep(0.03, 0.04, distanceFromPointX);

    float distanceFromPointXneg = length(vec2(-float(i), 0.0) - uv);
    float circleXneg = smoothstep(0.03, 0.04, distanceFromPointXneg);
    grid*=circleX*circleXneg;
    // ------------

    }
    // ------------



  // ------------

  float time = u_time;
  float x = uv.x;
  float y = uv.y;
  float yProcessed = <y_function>;

  float sinLine = plot(
    vec2(
      uv.y,
      yProcessed
    ),
    0.01
  );


  float func = sinLine;

  vec3 color = vec3(
    func * (0.75+grid),
    func * (0.9+grid),
    func
  );




	gl_FragColor = vec4(color,1.0);
}



