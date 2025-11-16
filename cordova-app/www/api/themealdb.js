// Módulo para consumir NestJS API (PostgreSQL) - Recetas
const MEALS_API_BASE = 'http://192.168.100.26:3001';

export async function getMealsByCategory(category = 'Seafood') {
  const res = await fetch(`${MEALS_API_BASE}/meals/filter?c=${category}`);
  if (!res.ok) throw new Error('Error al obtener recetas');
  const data = await res.json();
  // La API ya devuelve {meals: [...]}, solo adaptamos los nombres de campos
  return {
    meals: data.meals.map(meal => ({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb
    }))
  };
}

export async function getMealDetail(id) {
  const res = await fetch(`${MEALS_API_BASE}/meals/lookup?i=${id}`);
  if (!res.ok) throw new Error('Error al obtener detalle de receta');
  const meal = await res.json();
  // Adaptar formato de respuesta
  return {
    meals: [meal]
  };
}
