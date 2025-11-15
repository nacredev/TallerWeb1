// Módulo para consumir la API NestJS propia (compatibilidad TheMealDB)
const MEALDB_BASE = 'http://localhost:3001/api';

export async function getMealsByCategory(category = 'Seafood') {
  const url = `${MEALDB_BASE}/filter.php?c=${encodeURIComponent(category)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener recetas');
  return res.json();
}

export async function getMealDetail(id) {
  const url = `${MEALDB_BASE}/lookup.php?i=${encodeURIComponent(id)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener detalle de receta');
  return res.json();
}
