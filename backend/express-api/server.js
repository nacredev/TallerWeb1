import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './config/database.js';
import swaggerOptions from './config/swagger.js';
import pokemonRoutes from './routes/pokemon.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'InfoMóvil Express API - Pokémon',
    version: '1.0.0',
    status: 'active',
    docs: `http://localhost:${PORT}/api-docs`,
  });
});

// API Routes
app.use('/pokemon', pokemonRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Database connection and server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Express API running on http://localhost:${PORT}`);
    console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
  });
});
