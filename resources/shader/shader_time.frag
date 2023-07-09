#version 120
precision mediump float;
uniform float t; // time
uniform vec2 r; // resolution

void main() {
    float red = abs(sin(t));
    float green = abs(cos(t));
    float blue = (red + green) / 2.0;
    gl_FragColor = vec4(red, green, blue, 1.0);
}
