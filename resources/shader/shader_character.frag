#version 120
uniform float t; // time
uniform vec2 r; // resolution

const float PI = 3.1415926;
const vec3 lightColor = vec3(0.95, 0.95, 0.5);  // 背景の光の色
const vec3 backColor = vec3(0.95, 0.25, 0.25);  // 背景の下地の色
const vec3 faceColor = vec3(0.5765, 0.949, 0.502);   // 顔の色
const vec3 noseColor = vec3(0.3922, 0.251, 0.949);  // 鼻の色
const vec3 cheekColor = vec3(1.0, 0.251, 0.4392);  // 頬の色
const vec3 eyesColor = vec3(0.15, 0.05, 0.05);  // 目の色
const vec3 highlight = vec3(0.95, 0.95, 0.95);  // ハイライトの色
const vec3 lineColor = vec3(0.3, 0.2, 0.2);     // ラインの色

// 円を描く
void circle(vec2 p, vec2 offset, float size, vec3 color, inout vec3 i) {
    float l = length(p - offset);
    if (l < size) {
        i = color;
    }
}

// 正方形を描く
void rect(vec2 p, vec2 offset, float size, vec3 color, inout vec3 i) {
    vec2 q = (p - offset) / size;
    if (abs(q.x) < 1.0 && abs(q.y) < 1.0) {
        i = color;
    }
}

// 楕円を描く
void ellipse(vec2 p, vec2 offset, vec2 prop, float size, vec3 color, inout vec3 i) {
    vec2 q = (p - offset) / prop;
    if (length(q) < size) {
        i = color;
    }
}

// 円形にラインを引く
void circleLine(vec2 p, vec2 offset, float iSize, float oSize, vec3 color, inout vec3 i){
    vec2 q = p - offset;
    float l = length(q);
    if(l > iSize && l < oSize){
        i = color;
    }
}

// 円形のラインを変形して半円のラインを引く
void arcLine(vec2 p, vec2 offset, float iSize, float oSize, float rad, float height, vec3 color, inout vec3 i){
    float s = sin(rad);
    float c = cos(rad);
    vec2 q = (p - offset) * mat2(c, -s, s, c);
    float l = length(q);
    if(l > iSize && l < oSize && q.y > height){
        i = color;
    }
}

// 背景の光を描く
void sunrise(vec2 p, inout vec3 i){
    float f = atan(p.y, p.x) + t;
    float fs = sin(f * 10.0);
    i = mix(lightColor, backColor, fs);
}

void main(){
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);

    vec3 destColor = vec3(1.0);

    sunrise(p, destColor);

    // 大元の座標を回転させる
    float s = sin(sin(t * 2.0) * 0.75);
    float c = cos(sin(t * 2.0));
    vec2 q = p * mat2(c, -s, s, c);

    // 顔のパーツを順番に描いていく
    circle(q, vec2(0.0), 0.5, faceColor, destColor);
    circle(q, vec2(0.0, -0.05), 0.15, noseColor, destColor);
    circle(q, vec2(0.325, -0.05), 0.15, cheekColor, destColor);
    circle(q, vec2(-0.325, -0.05), 0.15, cheekColor, destColor);
    ellipse(q, vec2(0.15, 0.135), vec2(0.75, 1.0), 0.075, eyesColor, destColor);
    ellipse(q, vec2(-0.15, 0.135), vec2(0.75, 1.0), 0.075, eyesColor, destColor);
    circleLine(q, vec2(0.0), 0.5, 0.525, lineColor, destColor);
    circleLine(q, vec2(0.0, -0.05), 0.15, 0.17, lineColor, destColor);
    arcLine(q, vec2(0.325, -0.05), 0.15, 0.17, PI * 1.5, 0.0, lineColor, destColor);
    arcLine(q, vec2(-0.325, -0.05), 0.15, 0.17, PI * 0.5, 0.0, lineColor, destColor);
    arcLine(q * vec2(0.9, 1.0), vec2(0.0, -0.15), 0.2, 0.22, PI, 0.055, lineColor, destColor);
    rect(q, vec2(-0.025, 0.0), 0.035, highlight, destColor);
    rect(q, vec2(-0.35, 0.0), 0.035, highlight, destColor);
    rect(q, vec2(0.3, 0.0), 0.035, highlight, destColor);

    gl_FragColor = vec4(destColor, 1.0);
}
