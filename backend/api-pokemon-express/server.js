const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a SQLite
const dbPath = path.join(__dirname, 'database', 'pokemon.db');
const db = new sqlite3.Database(dbPath);

// Inicializar base de datos
const initDB = () => {
    const initSQL = require('fs').readFileSync(
        path.join(__dirname, 'database', 'init.sql'), 
        'utf8'
    );
    db.exec(initSQL, (err) => {
        if (err) {
            console.error('Error inicializando DB:', err);
        } else {
            console.log('Base de datos Pokémon inicializada');
        }
    });
};

// Rutas
app.get('/api/pokemon', (req, res) => {
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
    
    const sql = `SELECT * FROM pokemon LIMIT ? OFFSET ?`;
    
    db.all(sql, [limit, offset], (err, rows) => {
        if (err) {
            console.error('Error fetching pokemon:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        
        // Formatear respuesta similar a PokeAPI
        const results = rows.map(row => ({
            name: row.name,
            url: `http://localhost:${PORT}/api/pokemon/${row.id}`
        }));
        
        res.json({
            count: rows.length,
            results: results
        });
    });
});

app.get('/api/pokemon/:id', (req, res) => {
    const pokemonId = req.params.id;
    
    const sql = `SELECT * FROM pokemon WHERE id = ?`;
    
    db.get(sql, [pokemonId], (err, row) => {
        if (err) {
            console.error('Error fetching pokemon detail:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Pokémon no encontrado' });
        }
        
        // Formatear respuesta similar a PokeAPI
        res.json({
            id: row.id,
            name: row.name,
            height: row.height,
            weight: row.weight,
            sprites: {
                front_default: row.image_url
            },
            types: row.type.split(',').map(t => ({
                type: { name: t.trim() }
            }))
        });
    });
});

// Ruta de salud
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Pokémon funcionando' });
});

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`🚀 API Pokémon Express corriendo en http://localhost:${PORT}`);
    initDB();
});