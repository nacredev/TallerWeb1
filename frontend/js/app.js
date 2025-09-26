
// --- Navegación y renderizado SPA ---
const mainView = document.getElementById('main-view');
const homeBtn = document.getElementById('homeBtn');


// Recursos a mostrar
const resources = [
	{ id: 'recetas', name: 'Recetas', desc: 'Recetas populares y fáciles', icon: '🍲' },
	{ id: 'personajes', name: 'Pokémon', desc: 'Pokémon populares', icon: '⭐' }
];

// Importar módulos de APIs
import { getPokemons, getPokemonDetail } from '../api/pokeapi.js';
import { getMealsByCategory, getMealDetail } from '../api/themealdb.js';

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
	mainView.innerHTML = `<button onclick="window.renderLanding()" class="mb-4 text-blue-600 hover:underline">← Volver</button>`;
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
			// Evento para ver detalle
			pokeList.querySelectorAll('div[data-url]').forEach(div => {
				div.onclick = async () => {
					const detail = await getPokemonDetail(div.dataset.url);
								mainView.innerHTML = `<button onclick=\"window.renderResource('personajes')\" class=\"mb-4 text-blue-600 hover:underline\">← Volver</button>` +
									`<div class=\"flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 border border-blue-100\">
										<img src=\"${detail.sprites.front_default}\" alt=\"${detail.name}\" class=\"w-28 h-28 mb-3 drop-shadow\">
										<h3 class=\"text-2xl font-bold capitalize text-blue-800 mb-2\">${detail.name}</h3>
										<div class=\"text-gray-600 mb-1\">Tipo: <span class=\"font-semibold\">${detail.types.map(t => t.type.name).join(', ')}</span></div>
										<div class=\"text-gray-600 mb-1\">Altura: <span class=\"font-semibold\">${detail.height / 10} m</span></div>
										<div class=\"text-gray-600\">Peso: <span class=\"font-semibold\">${detail.weight / 10} kg</span></div>
									</div>`;
				};
			});
		} catch (e) {
			mainView.innerHTML += `<div class='text-red-600'>Error al cargar Pokémon</div>`;
		}
	} else if (id === 'recetas') {
		// Mostrar recetas
		mainView.innerHTML += `<h2 class="text-2xl font-bold mb-6 text-blue-700 text-center">Recetas populares</h2><div id="meal-list" class="grid grid-cols-1 sm:grid-cols-2 gap-6"></div>`;
		try {
			const data = await getMealsByCategory('Seafood');
			const mealList = document.getElementById('meal-list');
					mealList.innerHTML = data.meals.map(m => `
						<div class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center cursor-pointer hover:bg-blue-100 hover:scale-105 transition-all duration-200 border border-blue-100" data-id="${m.idMeal}">
							<img src="${m.strMealThumb}" alt="${m.strMeal}" class="w-24 h-24 rounded mb-3 drop-shadow">
							<span class="font-semibold mb-2 text-center text-blue-700 text-lg">${m.strMeal}</span>
							<span class="text-xs text-gray-400">Ver detalle</span>
						</div>
					`).join('');
			// Evento para ver detalle
			mealList.querySelectorAll('div[data-id]').forEach(div => {
				div.onclick = async () => {
					const detail = await getMealDetail(div.dataset.id);
					const meal = detail.meals[0];
								mainView.innerHTML = `<button onclick=\"window.renderResource('recetas')\" class=\"mb-4 text-blue-600 hover:underline\">← Volver</button>` +
									`<div class=\"flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 border border-blue-100\">
										<img src=\"${meal.strMealThumb}\" alt=\"${meal.strMeal}\" class=\"w-32 h-32 rounded mb-3 drop-shadow\">
										<h3 class=\"text-2xl font-bold text-center text-blue-800 mb-2\">${meal.strMeal}</h3>
										<div class=\"text-gray-600 mb-2\">${meal.strCategory} | ${meal.strArea}</div>
										<div class=\"text-gray-700 text-sm mb-2\">${meal.strInstructions.slice(0, 200)}...</div>
										<a href=\"${meal.strSource || '#'}\" target=\"_blank\" class=\"text-blue-500 underline\">Ver receta completa</a>
									</div>`;
				};
			});
		} catch (e) {
			mainView.innerHTML += `<div class='text-red-600'>Error al cargar recetas</div>`;
		}
	}
}

// Exponer funciones globales para navegación inline
window.renderLanding = renderLanding;
window.renderResource = renderResource;

// Inicializar app
renderLanding();

// Botón de inicio
if (homeBtn) homeBtn.onclick = renderLanding;
