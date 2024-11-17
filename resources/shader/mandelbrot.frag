#version 120
uniform float t; // time
uniform vec2 r; // resolution

int escape_time(
    vec2 complex,
    int limit
) {
    vec2 z = vec2(0.0);
    for (int i = 0; i < limit; ++i) {
        if (z.x * z.x + z.y * z.y > 4.0) {
            return 255 - i;
        }
        float real = z.x * z.x - z.y * z.y + complex.x;
        float image = 2.0 * z.x * z.y + complex.y;
        z = vec2(real, image);
    }
    return 0;
}

vec2 pixel_to_complex(
    vec2 bounds,
    vec2 pixel,
    vec2 upper_left,
    vec2 lower_right
) {
    float width = lower_right.x - upper_left.x;
    float height = upper_left.y - lower_right.y;

    float real = upper_left.x + pixel.x * width / bounds.x;
    float image = upper_left.y - pixel.y * height / bounds.y;

    return vec2(real, image);
}

void main() {
    vec2 complex = pixel_to_complex(
        r,
        gl_FragCoord.xy,
        vec2(-1.2, 0.35),
        vec2(-1.0, 0.20)
    );

    int color = escape_time(complex, 255);
    float normalized_color = color / 255.0;
    
    gl_FragColor = vec4(vec3(normalized_color), 1.0);
}
