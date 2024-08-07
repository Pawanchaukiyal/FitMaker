// models/exercise.models.js
import mongoose from 'mongoose';

const yogaSchema = new mongoose.Schema({
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
  yogaImage: {
    type: String,
    url: String,
  },

  level: {
    type: String,
    required: true,
    trim: true
  }
});

export const Yoga = mongoose.model('Yoga', yogaSchema);
