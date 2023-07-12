#version 120
uniform float t; // time
uniform vec2 r; // resolution

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);

    float s = sin(t);
    float c = cos(t);
    mat2 m = mat2(c, s, -s, c); // 行列に回転用の値をセット
    p *= m; // 行列をベクトルにかける

    vec2 q = vec2(p.x - 1.0, p.y);
    float f = 0.1 / length(q);
    gl_FragColor = vec4(vec3(f), 1.0);
}
