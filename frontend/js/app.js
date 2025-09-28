
// --- Navegación y renderizado SPA ---
const mainView = document.getElementById('main-view');
const homeBtn = document.getElementById('homeBtn');


// Recursos a mostrar
const resources = [
	{ id: 'recetas', name: 'Recetas', desc: 'Recetas populares y fáciles', icon: '🍲' },
	{ id: 'personajes', name: 'Pokémon', desc: 'Pokémon populares', icon: '⭐' },
	{ id: 'peliculas', name: 'Películas', desc: 'Busca películas y series', icon: '🎬' },
	{ id: 'noticias', name: 'Noticias', desc: 'Últimas noticias de tecnología', icon: '📰' }
];

// Importar módulos de APIs

import { getPokemons, getPokemonDetail } from '../api/pokeapi.js';
import { getMealsByCategory, getMealDetail } from '../api/themealdb.js';
import { fetchMovieByTitle, searchMovies } from '../api/omdbapi.js';
import { getTopNews, searchNews } from '../api/newsapi.js';

function renderLanding() {
	mainView.innerHTML = `
		<section class="grid grid-cols-1 sm:grid-cols-2 gap-8">
			${resources.map(r => `
				<div class="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-200 border border-blue-200" onclick="window.renderResource('${r.id}')">
					<div class="text-5xl mb-3 drop-shadow">${r.icon}</div>
					<h2 class="text-xl font-bold mb-1 text-blue-800">${r.name}</h2>
					<p class="text-gray-600 text-base text-center">${r.desc}</p>
				</div>
			`).join('')}
		</section>
		<div class="mt-8 text-center text-gray-500 text-sm">Selecciona un recurso para explorar información dinámica.</div>
	`;
}

// Render detalle de recurso (placeholder)

async function renderResource(id) {
	const res = resources.find(r => r.id === id);
	if (!res) return renderLanding();
	// Cambiar fondo según recurso
	document.body.className = '';
	document.body.classList.add(`bg-${id}`);
	mainView.innerHTML = `<button onclick="window.renderLanding()" class="btn-back mb-4">← Volver</button>`;
	// Actualizar menú activo
	document.querySelectorAll('.menu-btn').forEach(btn => {
		btn.classList.remove('active');
		if (btn.id === id || (id === 'personajes' && btn.id === 'pokemon')) {
			btn.classList.add('active');
		}
		if (id === 'recetas' && btn.id === 'recetas') btn.classList.add('active');
		if (id === 'peliculas' && btn.id === 'peliculas') btn.classList.add('active');
		if (id === 'noticias' && btn.id === 'noticias') btn.classList.add('active');
	});
	if (id === 'personajes') {
		// Mostrar pokemones
		mainView.innerHTML += `<h2 class="text-2xl font-bold mb-6 text-blue-700 text-center">Pokémon populares</h2><div id="poke-list" class="grid grid-cols-2 sm:grid-cols-3 gap-6"></div>`;
		try {
			const data = await getPokemons(12, 0);
			const pokeList = document.getElementById('poke-list');
			pokeList.innerHTML = data.results.map(p => `
				<div class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center cursor-pointer hover:bg-blue-100 hover:scale-105 transition-all duration-200 border border-blue-100" data-url="${p.url}">
					<span class="capitalize font-semibold mb-2 text-blue-700 text-lg">${p.name}</span>
					<span class="text-xs text-gray-400">Ver detalle</span>
				</div>
			`).join('');
		} catch (error) {
			const pokeList = document.getElementById('poke-list');
			pokeList.innerHTML = '<div class="text-red-600 text-center">Error al cargar los Pokémon</div>';
		}
		
	} else if (id === 'peliculas') {
		// Mostrar películas (solo una vez el bloque de HTML)
		mainView.innerHTML += `
			<h2 class="text-2xl font-bold mb-6 text-blue-700 text-center">Buscar películas</h2>
			<form id="movie-search-form" class="flex flex-col sm:flex-row gap-3 items-center justify-center mb-4">
				<input id="movie-search-input" type="text" placeholder="Título de la película o serie" class="border border-blue-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-200" required>
				<button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Buscar</button>
			</form>
			<div class="flex flex-col sm:flex-row gap-3 items-center justify-center mb-6">
				<input id="filter-year" type="number" min="1900" max="2100" placeholder="Filtrar por año" class="border border-blue-300 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-200">
				<div class="relative w-32">
					<input id="filter-genre" type="text" placeholder="Filtrar por género" class="border border-blue-300 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-200" autocomplete="off">
					<ul id="genre-suggestions" class="absolute left-0 right-0 bg-white border border-blue-200 rounded shadow-lg z-10 mt-1 hidden"></ul>
				</div>
				<select id="order-by" class="border border-blue-300 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-200">
					<option value="">Ordenar por...</option>
					<option value="title">Título (A-Z)</option>
					<option value="year">Año (asc)</option>
					<option value="year-desc">Año (desc)</option>
				</select>
			</div>
			<div id="movie-results" class="grid grid-cols-1 sm:grid-cols-2 gap-6"></div>
		`;

		// Sugerencias de géneros comunes
		setTimeout(() => {
			const commonGenres = [
				'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
				'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Musical', 'Mystery',
				'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
			];
			const genreInput = document.getElementById('filter-genre');
			const genreSuggestions = document.getElementById('genre-suggestions');
			// Mostrar sugerencias al hacer clic en el input
			genreInput.addEventListener('focus', () => {
				genreSuggestions.innerHTML = commonGenres.map(g => `<li class='px-3 py-2 cursor-pointer hover:bg-blue-100'>${g}</li>`).join('');
				genreSuggestions.classList.remove('hidden');
			});
			// Filtrar sugerencias al escribir
			genreInput.addEventListener('input', () => {
				const value = genreInput.value.toLowerCase();
				if (!value) {
					genreSuggestions.innerHTML = commonGenres.map(g => `<li class='px-3 py-2 cursor-pointer hover:bg-blue-100'>${g}</li>`).join('');
					genreSuggestions.classList.remove('hidden');
					return;
				}
				const filtered = commonGenres.filter(g => g.toLowerCase().includes(value));
				if (filtered.length === 0) {
					genreSuggestions.innerHTML = '';
					genreSuggestions.classList.add('hidden');
					return;
				}
				genreSuggestions.innerHTML = filtered.map(g => `<li class='px-3 py-2 cursor-pointer hover:bg-blue-100'>${g}</li>`).join('');
				genreSuggestions.classList.remove('hidden');
			});
			genreSuggestions.addEventListener('mousedown', (e) => {
				if (e.target.tagName === 'LI') {
					genreInput.value = e.target.textContent;
					genreSuggestions.innerHTML = '';
					genreSuggestions.classList.add('hidden');
					genreInput.dispatchEvent(new Event('input'));
				}
			});
			genreInput.addEventListener('blur', () => {
				setTimeout(() => genreSuggestions.classList.add('hidden'), 100);
			});
		}, 0);

		// Lógica de filtros y búsqueda
		const form = document.getElementById('movie-search-form');
		const input = document.getElementById('movie-search-input');
		const filterYear = document.getElementById('filter-year');
		const filterGenre = document.getElementById('filter-genre');
		const orderBy = document.getElementById('order-by');
		const resultsDiv = document.getElementById('movie-results');
		let lastResults = [];

		function renderMovies(movies) {
			resultsDiv.innerHTML = movies.map(m => {
				const poster = m.Poster && m.Poster !== 'N/A' ? m.Poster : './assets/img/movies-1.jpg';
				return `
					<div class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-blue-100">
						<img src="${poster}" alt="Poster" class="w-32 h-48 object-cover rounded mb-2 border border-blue-200">
						<div class="font-bold text-blue-700 mb-1">${m.Title}</div>
						<div class="text-gray-500 text-sm mb-1">${m.Year}</div>
						<div class="text-xs text-gray-400 mb-1">${m.Genre || ''}</div>
						<div class="text-xs text-gray-400">${m.Type === 'series' ? 'Serie' : 'Película'}</div>
					</div>
				`;
			}).join('');
		}

		function applyFilters() {
			let filtered = lastResults.slice();
			const year = filterYear.value.trim();
			const genre = filterGenre.value.trim().toLowerCase();
			if (year) {
				filtered = filtered.filter(m => m.Year === year);
			}
			if (genre) {
				filtered = filtered.filter(m => m.Genre && m.Genre.toLowerCase().includes(genre));
			}
			if (orderBy.value === 'title') {
				filtered.sort((a, b) => a.Title.localeCompare(b.Title));
			} else if (orderBy.value === 'year') {
				filtered.sort((a, b) => a.Year.localeCompare(b.Year));
			} else if (orderBy.value === 'year-desc') {
				filtered.sort((a, b) => b.Year.localeCompare(a.Year));
			}
			renderMovies(filtered);
		}

		filterYear.oninput = applyFilters;
		filterGenre.oninput = applyFilters;
		orderBy.onchange = applyFilters;

		form.onsubmit = async (e) => {
			e.preventDefault();
			resultsDiv.innerHTML = '<div class="text-gray-400">Buscando...</div>';
			const data = await searchMovies(input.value);
			if (data.Response === 'True' && data.Search) {
				// Para obtener género, hay que hacer fetchMovieByTitle por cada resultado
				lastResults = await Promise.all(data.Search.map(async m => {
					const detail = await fetchMovieByTitle(m.Title);
					return { ...m, Genre: detail.Genre || '', Type: detail.Type || 'movie' };
				}));
				renderMovies(lastResults);
			} else {
				resultsDiv.innerHTML = `<div class='text-red-600'>No se encontraron resultados.</div>`;
			}
		};
	}
}

// Exponer funciones globales para navegación inline
window.renderLanding = renderLanding;
window.renderResource = renderResource;

// Inicializar app
renderLanding();
// Fondo landing
document.body.className = '';
document.body.classList.add('bg-landing');

// Botón de inicio
if (homeBtn) homeBtn.onclick = renderLanding;
