// Módulo para consumir PokeAPI
const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export async function getPokemons(limit = 12, offset = 0) {
  const res = await fetch(`${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Error al obtener pokemones');
  return res.json();
}

export async function getPokemonDetail(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener detalle de pokemon');
  return res.json();
}
