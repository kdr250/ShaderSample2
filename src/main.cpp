#include <SFML/Graphics.hpp>
#include <iostream>
#include <vector>

int main()
{
    sf::RenderWindow window(sf::VideoMode(1280, 768),
                            "Shader Smaple2",
                            sf::Style::Titlebar | sf::Style::Close);

    sf::Shader shader;
    // shader.loadFromFile("resources/shader/shader_green.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_coord.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_coord2.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_time.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_time2.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_light.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_light2.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_light_move.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_light_move2.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_light_move3.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_multiple_light.frag", sf::Shader::Fragment);
    // shader.loadFromFile("resources/shader/shader_ring.frag", sf::Shader::Fragment);
    shader.loadFromFile("resources/shader/shader_sample.frag", sf::Shader::Fragment);

    sf::Texture texture;
    texture.create(window.getSize().x, window.getSize().y);

    sf::Sprite sprite;
    sprite.setTexture(texture);
    sprite.setPosition(sf::Vector2f(0.0f, 0.0f));

    sf::Clock time;
    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            switch (event.type)
            {
                case sf::Event::Closed:
                    window.close();

                case sf::Event::KeyPressed:
                    if (event.key.code == sf::Keyboard::Escape)
                    {
                        window.close();
                    }
            }
        }

        texture.update(window);

        shader.setUniform("t", time.getElapsedTime().asSeconds());
        shader.setUniform("r", sf::Glsl::Vec2(window.getSize().x, window.getSize().y));

        window.clear();

        // Draw the sprite and apply shader
        window.draw(sprite, &shader);

        window.display();
    }

    return 0;
}
