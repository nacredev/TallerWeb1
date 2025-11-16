// ...todo este bloque debe ir dentro de la función renderResource...
import { getPokemons, getPokemonDetail } from '../api/pokeapi.js';
import { getMealsByCategory, getMealDetail } from '../api/themealdb.js';
import { fetchMovieByTitle, searchMovies } from '../api/omdbapi.js';
import { getTopNews, searchNews } from '../api/newsapi.js';

document.addEventListener('DOMContentLoaded', () => {
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

	// Helper para fondo por recurso
	function setResourceBackground(id) {
		document.body.className = '';
		if (id === 'recetas') document.body.classList.add('bg-recetas');
		else if (id === 'personajes') document.body.classList.add('bg-pokemon');
		else if (id === 'peliculas') document.body.classList.add('bg-movies');
		else if (id === 'noticias') document.body.classList.add('bg-news');
		else document.body.classList.add('bg-landing');
	}

	function renderLanding() {
		mainView.innerHTML = `
			<section id="resource-cards" class="grid grid-cols-1 sm:grid-cols-2 gap-8">
				${resources.map(r => `
					<div class="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-200 border border-blue-200" data-resource-id="${r.id}">
						<div class="text-5xl mb-3 drop-shadow">${r.icon}</div>
						<h2 class="text-xl font-bold mb-1 text-blue-800">${r.name}</h2>
						<p class="text-gray-600 text-base text-center">${r.desc}</p>
					</div>
				`).join('')}
			</section>
			<div class="mt-8 text-center text-gray-500 text-sm">Selecciona un recurso para explorar información dinámica.</div>
		`;
	}

    // Delegar click en los cards del landing SOLO UNA VEZ (fuera de renderLanding)


	// Render detalle de recurso (placeholder)
	async function renderResource(id) {
		const res = resources.find(r => r.id === id);
		if (!res) {
			renderLanding();
			return;
		}
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
			setResourceBackground('personajes');
			mainView.innerHTML += `<h2 class="category-title">Pokémon populares</h2><div id="poke-list" class="grid grid-cols-2 sm:grid-cols-3 gap-6"></div>`;
			try {
				mainView.querySelector('#poke-list').innerHTML = '<div class="loading-container"><div class="loader" aria-label="Cargando pokémon"></div></div>';
				const data = await getPokemons(12, 0);
				const pokeList = document.getElementById('poke-list');
				pokeList.innerHTML = data.results.map(p => {
					const pokemonId = p.url.split('/').filter(Boolean).pop();
					return `
						<div class="bg-white bg-opacity-80 rounded-xl shadow-lg p-4 flex flex-col items-center cursor-pointer hover:bg-blue-100 hover:scale-105 transition-all duration-200 border border-blue-100" data-poke-name="${p.name}" data-poke-url="${p.url}">
							<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png" alt="${p.name}" class="w-20 h-20 object-cover rounded mb-2 border border-blue-200" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png'">
							<span class="capitalize font-semibold mb-2 text-blue-700 text-lg">${p.name}</span>
							<span class="text-xs text-gray-400">Ver detalle</span>
						</div>
					`;
				}).join('');
				// Delegar click para mostrar detalle de Pokémon
				pokeList.querySelectorAll('[data-poke-name]').forEach(card => {
					card.addEventListener('click', async () => {
						const url = card.getAttribute('data-poke-url');
						mainView.innerHTML = '<div class="text-gray-400">Cargando detalle...</div>';
						setResourceBackground('personajes');
						try {
							const detail = await getPokemonDetail(url);
							if (detail) {
								mainView.innerHTML = `
									<button onclick="window.renderResource('personajes')" class="btn-back mb-4">← Volver</button>
									<div class="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
										<img src="${detail.sprites?.other?.['official-artwork']?.front_default || detail.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detail.id}.png`}" alt="${detail.name}" class="w-48 h-48 object-cover rounded mb-4 border border-blue-200 mx-auto">
										<h2 class="font-bold text-2xl text-blue-700 mb-2 capitalize">${detail.name}</h2>
										<div class="mb-2"><b>Altura:</b> ${detail.height}</div>
										<div class="mb-2"><b>Peso:</b> ${detail.weight}</div>
										<div class="mb-2"><b>Tipos:</b> ${detail.types?.map(t => t.type?.name || t).join(', ') || 'No disponible'}</div>
									</div>
								`;
							} else {
								mainView.innerHTML = '<div class="text-red-600 text-center">No se encontró el detalle del Pokémon.</div>';
							}
						} catch (error) {
							console.error('Error al cargar detalle:', error);
							mainView.innerHTML = '<div class="text-red-600 text-center">Error al cargar el detalle del Pokémon.</div>';
						}
					});
				});
			} catch (error) {
				console.error('Error al cargar pokémon:', error);
				const pokeList = document.getElementById('poke-list');
				pokeList.innerHTML = '<div class="error-msg">Error al cargar los Pokémon</div>';
			}
		} else if (id === 'peliculas') {
			// Mostrar películas
			mainView.innerHTML += `
				<h2 class="category-title">Buscar películas</h2>
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
				genreInput.addEventListener('focus', () => {
					genreSuggestions.innerHTML = commonGenres.map(g => `<li class='px-3 py-2 cursor-pointer hover:bg-blue-100'>${g}</li>`).join('');
					genreSuggestions.classList.remove('hidden');
				});
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
						<div class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-blue-100 cursor-pointer hover:bg-blue-100 transition" data-movie-title="${m.Title}">
							<img src="${poster}" alt="Poster" class="w-32 h-48 object-cover rounded mb-2 border border-blue-200">
							<div class="font-bold text-blue-700 mb-1">${m.Title}</div>
							<div class="text-gray-500 text-sm mb-1">${m.Year}</div>
							<div class="text-xs text-gray-400 mb-1">${m.Genre || ''}</div>
							<div class="text-xs text-gray-400">${m.Type === 'series' ? 'Serie' : 'Película'}</div>
						</div>
					`;
				}).join('');
				// Delegar click para mostrar detalle de película/serie
				resultsDiv.querySelectorAll('[data-movie-title]').forEach(card => {
					card.addEventListener('click', async () => {
						const title = card.getAttribute('data-movie-title');
						mainView.innerHTML = '<div class="text-gray-400">Cargando detalle...</div>';
						const detail = await fetchMovieByTitle(title);
						if (detail && detail.Title) {
							mainView.innerHTML = `
								<button onclick="window.renderResource('peliculas')" class="btn-back mb-4">← Volver</button>
								<div class="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
									<img src="${detail.Poster && detail.Poster !== 'N/A' ? detail.Poster : './assets/img/movies-1.jpg'}" alt="${detail.Title}" class="w-48 h-64 object-cover rounded mb-4 border border-blue-200 mx-auto">
									<h2 class="font-bold text-2xl text-blue-700 mb-2">${detail.Title}</h2>
									<div class="mb-2"><b>Año:</b> ${detail.Year}</div>
									<div class="mb-2"><b>Género:</b> ${detail.Genre}</div>
									<div class="mb-2"><b>Director:</b> ${detail.Director}</div>
									<div class="mb-2"><b>Sinopsis:</b> ${detail.Plot}</div>
								</div>
							`;
						} else {
							mainView.innerHTML = '<div class="text-red-600 text-center">No se encontró el detalle de la película.</div>';
						}
					});
				});
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
				resultsDiv.innerHTML = '<div class="loading-container"><div class="loader" aria-label="Buscando películas"></div></div>';
				const data = await searchMovies(input.value);
				console.log('Datos recibidos:', data);
				if (data.Response === 'True' && data.Search && data.Search.length > 0) {
					lastResults = await Promise.all(data.Search.map(async m => {
						const detail = await fetchMovieByTitle(m.Title);
						return { ...m, Genre: detail.Genre || '', Type: detail.Type || 'movie' };
					}));
					renderMovies(lastResults);
				} else {
					console.error('No se encontraron resultados o error:', data);
					resultsDiv.innerHTML = `<div class='error-msg'>No se encontraron resultados.</div>`;
				}
			};
		} else if (id === 'recetas') {
			mainView.innerHTML += `<h2 class="category-title">Recetas populares</h2><div id="recetas-list" class="grid grid-cols-1 sm:grid-cols-2 gap-6"></div>`;
			try {
				mainView.querySelector('#recetas-list').innerHTML = '<div class="loading-container"><div class="loader" aria-label="Cargando recetas"></div></div>';
				const data = await getMealsByCategory('Seafood');
				const recetasList = document.getElementById('recetas-list');
				if (data.meals && data.meals.length > 0) {
					recetasList.innerHTML = data.meals.map(m => `
						<div class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-blue-100 cursor-pointer hover:bg-blue-100 transition" data-meal-id="${m.idMeal}">
							<img src="${m.strMealThumb}" alt="${m.strMeal}" class="w-32 h-32 object-cover rounded mb-2 border border-blue-200">
							<div class="font-bold text-blue-700 mb-1">${m.strMeal}</div>
						</div>
					`).join('');
					// Delegar click para mostrar detalle de receta
					recetasList.querySelectorAll('[data-meal-id]').forEach(card => {
						card.addEventListener('click', async () => {
							const id = card.getAttribute('data-meal-id');
							mainView.innerHTML = '<div class="text-gray-400">Cargando detalle...</div>';
							const detail = await getMealDetail(id);
							if (detail.meals && detail.meals[0]) {
								const meal = detail.meals[0];
								mainView.innerHTML = `
									<button onclick="window.renderResource('recetas')" class="btn-back mb-4">← Volver</button>
									<div class="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
										<img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-48 h-48 object-cover rounded mb-4 border border-blue-200 mx-auto">
										<h2 class="font-bold text-2xl text-blue-700 mb-2">${meal.strMeal}</h2>
										<div class="mb-2"><b>Categoría:</b> ${meal.strCategory}</div>
										<div class="mb-2"><b>Área:</b> ${meal.strArea}</div>
										<div class="mb-2"><b>Instrucciones:</b> <br>${meal.strInstructions}</div>
									</div>
								`;
							} else {
								mainView.innerHTML = '<div class="text-red-600 text-center">No se encontró el detalle de la receta.</div>';
							}
						});
					});
				} else {
					recetasList.innerHTML = '<div class="error-msg">No se encontraron recetas.</div>';
				}
			} catch (error) {
				const recetasList = document.getElementById('recetas-list');
				recetasList.innerHTML = '<div class="error-msg">Error al cargar las recetas.</div>';
			}
		} else if (id === 'noticias') {
			mainView.innerHTML += `<h2 class="category-title">Noticias de tecnología</h2><div id="noticias-list" class="grid grid-cols-1 sm:grid-cols-2 gap-6"></div>`;
			try {
				mainView.querySelector('#noticias-list').innerHTML = '<div class="loading-container"><div class="loader" aria-label="Cargando noticias"></div></div>';
				const data = await getTopNews('technology');
				const noticiasList = document.getElementById('noticias-list');
				if (data.articles && data.articles.length > 0) {
					noticiasList.innerHTML = data.articles.map(n => `
						<div class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-start border border-blue-100 cursor-pointer hover:bg-blue-100 transition" data-news-url="${n.url}">
							<img src="${n.urlToImage ? n.urlToImage : './assets/img/movies-1.jpg'}" alt="Noticia" class="w-32 h-32 object-cover rounded mb-2 border border-blue-200" onerror="this.src='./assets/img/movies-1.jpg'">
							<div class="font-bold text-blue-700 mb-1">${n.title}</div>
							<div class="text-gray-500 text-sm mb-1">${n.description}</div>
							<span class="text-blue-600 underline text-xs">Ver más</span>
						</div>
					`).join('');
					// Delegar click para mostrar detalle de noticia
					noticiasList.querySelectorAll('[data-news-url]').forEach(card => {
						card.addEventListener('click', () => {
							const url = card.getAttribute('data-news-url');
							setResourceBackground('noticias');
							mainView.innerHTML = `
								<button onclick="window.renderResource('noticias')" class="btn-back mb-4">← Volver</button>
								<div class="w-full">
									<iframe src="${url}" class="w-full h-[90vh] border rounded-xl bg-white" title="Noticia" style="background:white;"></iframe>
								</div>
							`;
						});
					});
				} else {
					noticiasList.innerHTML = '<div class="error-msg">No se encontraron noticias.</div>';
				}
			} catch (error) {
				const noticiasList = document.getElementById('noticias-list');
				noticiasList.innerHTML = '<div class="error-msg">Error al cargar las noticias.</div>';
			}
		}
	}

	// Exponer funciones globales para navegación inline
	window.renderLanding = renderLanding;
	window.renderResource = renderResource;

	// Delegar click en los cards del landing SOLO UNA VEZ
    document.addEventListener('click', (e) => {
        const card = e.target.closest('[data-resource-id]');
        if (card && card.parentElement && card.parentElement.id === 'resource-cards') {
            renderResource(card.getAttribute('data-resource-id'));
            setResourceBackground(card.getAttribute('data-resource-id'));
        }
    });

	// Inicializar app
	renderLanding();
    setResourceBackground('landing');

	// Botón de inicio
	if (homeBtn) homeBtn.onclick = renderLanding;
});

// ...existing code inside DOMContentLoaded...
