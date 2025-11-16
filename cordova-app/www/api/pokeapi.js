// Módulo para consumir Express API (MongoDB) - Pokémon
const POKEMON_API_BASE = 'http://192.168.100.26:3002';

export async function getPokemons(limit = 12, offset = 0) {
  const res = await fetch(`${POKEMON_API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Error al obtener pokemones');
  const data = await res.json();
  // La API devuelve {count, results}, así que ya viene en el formato correcto
  return data;
}

export async function getPokemonDetail(url) {
  // Extraer el ID de la URL
  const id = url.split('/').filter(Boolean).pop();
  const res = await fetch(`${POKEMON_API_BASE}/pokemon/${id}`);
  if (!res.ok) throw new Error('Error al obtener detalle de pokemon');
  return res.json();
}
