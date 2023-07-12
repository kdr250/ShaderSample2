#include <SFML/Graphics.hpp>
#include <iostream>
#include <vector>

int main()
{
    sf::RenderWindow window(sf::VideoMode(1280, 768),
                            "Shader Smaple2",
                            sf::Style::Titlebar | sf::Style::Close);

    int shaderIndex                      = 0;
    std::vector<std::string> shaderNames = {"shader_green.frag",
                                            "shader_coord.frag",
                                            "shader_coord2.frag",
                                            "shader_time.frag",
                                            "shader_time2.frag",
                                            "shader_light.frag",
                                            "shader_light2.frag",
                                            "shader_light_move.frag",
                                            "shader_light_move2.frag",
                                            "shader_light_move3.frag",
                                            "shader_multiple_light.frag",
                                            "shader_ring.frag",
                                            "shader_sample.frag",
                                            "shader_bw.frag",
                                            "shader_bw2.frag",
                                            "shader_bw3.frag",
                                            "shader_kirakira.frag",
                                            "shader_kirakira2.frag",
                                            "shader_kirakira3.frag",
                                            "shader_revolve.frag",
                                            "shader_rect.frag",
                                            "shader_character.frag"};
    std::vector<sf::Shader> shaders(shaderNames.size());

    for (int i = 0; i < shaderNames.size(); i++)
    {
        std::string name = shaderNames[i];
        shaders[i].loadFromFile("resources/shader/" + name, sf::Shader::Fragment);
    }

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
                    else
                    {
                        shaderIndex = (shaderIndex + 1) % (int)shaders.size();
                    }
            }
        }

        texture.update(window);

        shaders[shaderIndex].setUniform("t", time.getElapsedTime().asSeconds());
        shaders[shaderIndex].setUniform("r",
                                        sf::Glsl::Vec2(window.getSize().x, window.getSize().y));

        window.clear();

        // Draw the sprite and apply shader
        window.draw(sprite, &shaders[shaderIndex]);

        window.display();
    }

    return 0;
}
