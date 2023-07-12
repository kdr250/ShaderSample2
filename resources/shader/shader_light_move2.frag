#version 120
uniform float t; // time
uniform vec2 r; // resolution

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
    p += vec2(cos(t), sin(t)) * 0.5;
    float l = 0.1 / length(p);
    gl_FragColor = vec4(vec3(l), 1.0);
}
