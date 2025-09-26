// Módulo para consumir TheMealDB
const MEALDB_BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function getMealsByCategory(category = 'Seafood') {
  const res = await fetch(`${MEALDB_BASE}/filter.php?c=${category}`);
  if (!res.ok) throw new Error('Error al obtener recetas');
  return res.json();
}

export async function getMealDetail(id) {
  const res = await fetch(`${MEALDB_BASE}/lookup.php?i=${id}`);
  if (!res.ok) throw new Error('Error al obtener detalle de receta');
  return res.json();
}
