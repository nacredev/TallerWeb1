import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  height: Number,
  weight: Number,
  types: [
    {
      type: String,
    },
  ],
  sprites: {
    front_default: String,
    other: {
      'official-artwork': {
        front_default: String,
      },
    },
  },
  stats: [
    {
      base_stat: Number,
      stat: {
        name: String,
      },
    },
  ],
  abilities: [
    {
      ability: {
        name: String,
      },
    },
  ],
});

export default mongoose.model('Pokemon', pokemonSchema);
