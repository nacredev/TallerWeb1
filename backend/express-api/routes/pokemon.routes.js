import express from 'express';
import Pokemon from '../models/pokemon.model.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pokemon:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         height:
 *           type: integer
 *         weight:
 *           type: integer
 *         types:
 *           type: array
 *           items:
 *             type: string
 *         sprites:
 *           type: object
 *         stats:
 *           type: array
 *         abilities:
 *           type: array
 */

/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Obtener lista de pokémon con paginación
 *     tags: [pokemon]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Número de pokémon a retornar
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Offset para paginación
 *     responses:
 *       200:
 *         description: Lista de pokémon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 results:
 *                   type: array
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 12, 100);
    const offset = Math.max(parseInt(req.query.offset) || 0, 0);

    const count = await Pokemon.countDocuments();
    const results = await Pokemon.find()
      .skip(offset)
      .limit(limit)
      .select('id name');

    res.json({
      count,
      results: results.map((p) => ({
        name: p.name,
        url: `http://localhost:${process.env.PORT || 3002}/pokemon/${p.id}`,
      })),
    });
  } catch (error) {
    console.error('Error fetching pokemon list:', error);
    res.status(500).json({ error: 'Failed to fetch pokemon list' });
  }
});

/**
 * @swagger
 * /pokemon/{id}:
 *   get:
 *     summary: Obtener detalle de un pokémon por ID
 *     tags: [pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pokémon
 *     responses:
 *       200:
 *         description: Detalle del pokémon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: Pokémon no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid pokemon ID' });
    }

    const pokemon = await Pokemon.findOne({ id });
    
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    
    res.json(pokemon);
  } catch (error) {
    console.error('Error fetching pokemon:', error);
    res.status(500).json({ error: 'Failed to fetch pokemon' });
  }
});

/**
 * @swagger
 * /pokemon/name/{name}:
 *   get:
 *     summary: Obtener detalle de un pokémon por nombre
 *     tags: [pokemon]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del pokémon
 *     responses:
 *       200:
 *         description: Detalle del pokémon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: Pokémon no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/name/:name', async (req, res) => {
  try {
    const name = req.params.name.toLowerCase().trim();
    
    if (!name) {
      return res.status(400).json({ error: 'Pokemon name is required' });
    }

    const pokemon = await Pokemon.findOne({ name });
    
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    
    res.json(pokemon);
  } catch (error) {
    console.error('Error fetching pokemon by name:', error);
    res.status(500).json({ error: 'Failed to fetch pokemon' });
  }
});

export default router;
