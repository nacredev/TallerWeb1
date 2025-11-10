import mongoose from 'mongoose';
import Pokemon from './models/pokemon.model.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon_db';

const samplePokemon = [
  {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    types: ['grass', 'poison'],
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        },
      },
    },
    stats: [
      { base_stat: 45, stat: { name: 'hp' } },
      { base_stat: 49, stat: { name: 'attack' } },
      { base_stat: 49, stat: { name: 'defense' } },
    ],
    abilities: [
      { ability: { name: 'overgrow' } },
      { ability: { name: 'chlorophyll' } },
    ],
  },
  {
    id: 4,
    name: 'charmander',
    height: 6,
    weight: 85,
    types: ['fire'],
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        },
      },
    },
    stats: [
      { base_stat: 39, stat: { name: 'hp' } },
      { base_stat: 52, stat: { name: 'attack' } },
      { base_stat: 43, stat: { name: 'defense' } },
    ],
    abilities: [
      { ability: { name: 'blaze' } },
      { ability: { name: 'solar-power' } },
    ],
  },
  {
    id: 7,
    name: 'squirtle',
    height: 5,
    weight: 90,
    types: ['water'],
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        },
      },
    },
    stats: [
      { base_stat: 44, stat: { name: 'hp' } },
      { base_stat: 48, stat: { name: 'attack' } },
      { base_stat: 65, stat: { name: 'defense' } },
    ],
    abilities: [
      { ability: { name: 'torrent' } },
      { ability: { name: 'rain-dish' } },
    ],
  },
  {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    types: ['electric'],
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        },
      },
    },
    stats: [
      { base_stat: 35, stat: { name: 'hp' } },
      { base_stat: 55, stat: { name: 'attack' } },
      { base_stat: 40, stat: { name: 'defense' } },
    ],
    abilities: [
      { ability: { name: 'static' } },
      { ability: { name: 'lightning-rod' } },
    ],
  },
  {
    id: 150,
    name: 'mewtwo',
    height: 20,
    weight: 1220,
    types: ['psychic'],
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
        },
      },
    },
    stats: [
      { base_stat: 106, stat: { name: 'hp' } },
      { base_stat: 110, stat: { name: 'attack' } },
      { base_stat: 90, stat: { name: 'defense' } },
    ],
    abilities: [
      { ability: { name: 'pressure' } },
      { ability: { name: 'unnerve' } },
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if already seeded
    const count = await Pokemon.countDocuments();
    if (count > 0) {
      console.log(`ℹ️  Database already has ${count} pokémon`);
      process.exit(0);
    }

    // Insert sample pokemon
    await Pokemon.insertMany(samplePokemon);
    console.log(`✅ Seeded ${samplePokemon.length} pokémon`);
    console.log('✅ Seeding completed successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
