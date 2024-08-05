import { Exercise } from '../models/exercise.models.js';
import { ApiError } from '../utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { uploadOnCloudinary, uploadImageByUrl } from '../utils/cloudinary.js';

// Create Exercise
const createExercise = asyncHandler(async (req, res) => {
  const { name, instructions, aot, category, type, imageUrl } = req.body;

  if (!name || !instructions || !aot || !category || !type) {
    throw new ApiError(400, 'All fields are required');
  }

  let exerciseImage;
  try {
    if (req.file) {
      exerciseImage = await uploadOnCloudinary(req.file.path);
    } else if (imageUrl) {
      exerciseImage = await uploadImageByUrl(imageUrl);
    }
  } catch (error) {
    console.error('Error during image upload:', error);
    throw new ApiError(500, 'Error uploading exercise image');
  }

  const exercise = await Exercise.create({
    name,
    instructions,
    aot: Array.isArray(aot) ? aot : [aot],
    exerciseImage: exerciseImage?.url || '',
    category,
    type
  });

  return res
    .status(201)
    .json(new ApiResponse(201, exercise, 'Exercise created successfully'));
});


// get All Exercise
const getAllExercises = asyncHandler(async (req, res) => {
  try {
    // Fetch all exercises from the database
    const exercises = await Exercise.find();

    // Check if there are exercises available
    if (exercises.length === 0) {
      return res.status(404).json(new ApiResponse(404, null, 'No exercises found'));
    }

    // Return the exercises in the response
    return res.status(200).json(new ApiResponse(200, exercises, 'Exercises fetched successfully'));
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw new ApiError(500, 'Error fetching exercises');
  }
});

const getExercisesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!category) {
    throw new ApiError(400, 'Category is required');
  }

  // Find exercises by category
  const exercises = await Exercise.find({ category });

  if (exercises.length === 0) {
    throw new ApiError(404, 'No exercises found for this category');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, exercises, 'Exercises fetched successfully'));
});


// Get Exercises by AOT
const getExercisesByAot = asyncHandler(async (req, res) => {
  const { aot } = req.params;

  if (!aot) {
    throw new ApiError(400, 'AOT (area of target) is required');
  }

  const exercises = await Exercise.find({ aot: aot });

  if (!exercises.length) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, 'No exercises found for this area of target'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, exercises, 'Exercises fetched successfully'));
});

// Update Exercise
const updateExercise = asyncHandler(async (req, res) => {
  const { id } = req.params;  // Exercise ID from URL params
  const { name, instructions, aot, category, type, imageUrl } = req.body;

  // Check if the exercise exists
  const exercise = await Exercise.findById(id);
  if (!exercise) {
    throw new ApiError(404, 'Exercise not found');
  }

  // Update fields
  if (name) exercise.name = name;
  if (instructions) exercise.instructions = instructions;
  // Handle 'aot' as an array
  if (aot) {
    exercise.aot = Array.isArray(aot) ? aot : [aot];
  }
  if (category) exercise.category = category;
  if (type) exercise.type = type;

  // Handle file upload if a new file is provided
  if (req.file) {
    console.log("Uploading new file from device...");
    const exerciseImage = await uploadOnCloudinary(req.file.path);
    if (!exerciseImage) {
      throw new ApiError(500, 'Error uploading exercise image');
    }
    exercise.exerciseImage = exerciseImage.url;
  } else if (imageUrl) {
    console.log("Uploading new file from URL...");
    const exerciseImage = await uploadImageByUrl(imageUrl);
    if (!exerciseImage) {
      throw new ApiError(500, 'Error uploading exercise image');
    }
    exercise.exerciseImage = exerciseImage.url;
  }

  // Save updated exercise
  await exercise.save();

  return res
    .status(200)
    .json(new ApiResponse(200, exercise, 'Exercise updated successfully'));
});



// Delete Exercise
const deleteExercise = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the exercise by ID and delete it
  const exercise = await Exercise.findByIdAndDelete(id);

  if (!exercise) {
    throw new ApiError(404, 'Exercise not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Exercise deleted successfully'));
});




export { createExercise, getExercisesByCategory, getExercisesByAot, updateExercise,deleteExercise,getAllExercises };


