// models/exercise.models.js
import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  instructions: {
    type: String,
    required: true,
    trim: true
  },
  aot: {
    type: [String],
    required: true,
    trim: true
  },
  exerciseImage: {
    type: String,
    url: String,
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  }
});

export const Exercise = mongoose.model('Exercise', exerciseSchema);
