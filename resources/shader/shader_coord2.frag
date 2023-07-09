#version 120
precision mediump float;
uniform float t; // time
uniform vec2 r; // resolution

void main(void) {
	float a = gl_FragCoord.y / r.y;
	gl_FragColor = vec4(vec3(a), 1.0);
}
