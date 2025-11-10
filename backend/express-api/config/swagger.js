const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InfoMóvil - Pokemon API',
      version: '1.0.0',
      description: 'API de Pokémon desarrollada con Express y MongoDB',
      contact: {
        name: 'InfoMóvil Team',
      },
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'pokemon',
        description: 'Endpoints para gestión de Pokémon',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

export default swaggerOptions;
