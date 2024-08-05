// models/blog.model.js
import mongoose from 'mongoose';

// Define the schema for the blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  views: {
    type: Number,
    default: 0,
  },
  writtenBy: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Add a pre-save hook to update the updatedAt field
blogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model using the schema
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
