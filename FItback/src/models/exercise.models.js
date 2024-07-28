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
  targeted_area: {
    type: String,
    required: true,
    trim: true
  },
  gif: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
});

export const Exercise = mongoose.model('Exercise', exerciseSchema);
