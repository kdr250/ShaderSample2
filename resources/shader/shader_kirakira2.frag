#version 120
uniform float t; // time
uniform vec2 r; // resolution

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
    vec2 q = mod(p, 0.2) - 0.1;
    float f = 0.2 / abs(q.x) * abs(q.y);
    gl_FragColor = vec4(vec3(f), 1.0);
}
