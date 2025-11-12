CREATE TABLE IF NOT EXISTS pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    height REAL NOT NULL,
    weight REAL NOT NULL,
    image_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT OR IGNORE INTO pokemon (name, type, height, weight, image_url) VALUES
('pikachu', 'electric', 0.4, 6.0, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'),
('bulbasaur', 'grass,poison', 0.7, 6.9, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'),
('charmander', 'fire', 0.6, 8.5, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'),
('squirtle', 'water', 0.5, 9.0, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'),
('eevee', 'normal', 0.3, 6.5, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png'),
('jigglypuff', 'normal,fairy', 0.5, 5.5, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png'),
('meowth', 'normal', 0.4, 4.2, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png'),
('psyduck', 'water', 0.8, 19.6, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png'),
('machop', 'fighting', 0.8, 19.5, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png'),
('abra', 'psychic', 0.9, 19.5, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png'),
('gastly', 'ghost,poison', 1.3, 0.1, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png'),
('onix', 'rock,ground', 8.8, 210.0, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png');