#version 120
precision mediump float;
uniform float t; // time
uniform vec2 r; // resolution

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y); // normalize    
    float l = 0.01 / abs(length(p) - 0.5);
    gl_FragColor = vec4(vec3(l), 1.0);
}
