# InfoMóvil - Aplicación Web de Información Dinámica

## Información del Grupo
- Número de grupo: [Tu número de grupo]
- Integrantes:
  1. [Brayan Pizarro Bugueño] - RUT: [19.873.488-8]
  2. [Nombre completo] - RUT: [Tu RUT]
  3. [Nombre completo] - RUT: [Tu RUT]

## Descripción del Proyecto
InfoMóvil es una aplicación web que centraliza información dinámica de diferentes fuentes, presentándola de manera clara y atractiva. La aplicación es totalmente responsiva y funciona perfectamente en dispositivos móviles, tablets y escritorio.

## APIs Implementadas
1. TheMealDB (Recetas)
   - Muestra recetas populares de mariscos
   - Permite ver detalles de cada receta
   - Incluye imágenes, instrucciones y origen

2. PokeAPI (Pokémon)
   - Lista Pokémon populares
   - Muestra detalles como tipo, altura y peso
   - Incluye imágenes de los Pokémon

3. OMDB API (Películas)
   - Permite buscar películas y series
   - Muestra detalles como año, género y director
   - Incluye pósters y sinopsis

4. HackerNews API (Noticias)
   - Muestra las últimas noticias de tecnología
   - Incluye puntuación y comentarios
   - Enlaces directos a las fuentes originales

## Características Técnicas
- Diseño Mobile First usando Tailwind CSS
- Implementado con JavaScript puro (sin frameworks)
- Single Page Application (SPA)
- Manejo de errores y estados de carga
- Interfaz responsiva y accesible
- Filtrado y búsqueda dinámica
- Navegación fluida sin recarga de página

## Estructura del Proyecto
```
frontend/
├── api/              # Módulos de integración con APIs
│   ├── omdbapi.js    # Integración con OMDB API
│   ├── pokeapi.js    # Integración con PokeAPI
│   ├── themealdb.js  # Integración con TheMealDB
│   └── newsapi.js    # Integración con HackerNews
├── assets/           # Recursos estáticos
│   └── img/          # Imágenes
├── css/             # Estilos
│   ├── tailwind.css  # Configuración de Tailwind
│   └── styles.css    # Estilos compilados
├── js/              # Lógica JavaScript
│   └── app.js        # Aplicación principal
└── index.html       # Página principal
```

## Cómo ejecutar el proyecto
1. Clonar el repositorio
2. Navegar al directorio frontend
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Abrir `index.html` con Live Server en VS Code