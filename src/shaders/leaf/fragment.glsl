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
    return smoothstep(0.01, 0.0, abs(st.y - st.x));
}


void main() {
  // 0-1 coordinates of current point
  //equivalent to vUv
	// vec2 st = gl_FragCoord.xy/u_resolution; 
  vec2 crest = vUv;
  crest.y = pow(crest.y, 1.5);

  vec3 color = vec3(0.1, min(0.7,max(0.3,crest.y + crest.x)), 0.1); //base color in bg

  // Plot a line
  float crestOut = plot(crest);

  vec2 edge1 = vUv;
  edge1.x = sqrt(edge1.x);
  float edge1Out = plot(edge1);

  vec2 edge2 = vUv;
  edge2.x = pow(edge2.x, 2.0);
  float edge2Out = plot(edge2);



  vec3 green = vec3(0.2,0.8,0.2);
  vec3 darkGreen = vec3(0.3,0.6,0.2);


  float outsideEdge1 = smoothstep(0.01, 0.0, edge1.y - edge1.x);
  float outsideEdge2 = smoothstep(0.01, 0.0, edge2.x - edge2.y);
  float outsideEdges = smoothstep(0.01, 0.0, outsideEdge1 * outsideEdge2);

  
  vec2 crestArm1 = crest;
  crestArm1.x = 0.5 - min(crest.x, crest.y);
  float crestArm1Out = plot(crestArm1);
  crestArm1Out = crestArm1Out - outsideEdges;

  vec2 crestArm2 = crest;
  crestArm2.x = 0.2 - min(crest.x, crest.y);
  float crestArm2Out = plot(crestArm2);
  crestArm2Out = crestArm2Out - outsideEdges;


  color =
    // show base color if not on the line
    (1.0
    - outsideEdges
  )
    * darkGreen
    // --------------------
    // show color on the lines
    +crestArm1Out * green
    +crestArm2Out * green
    +edge1Out * green
    +edge2Out * green
    +crestOut * green;

	gl_FragColor = vec4(color,1.0);
}



