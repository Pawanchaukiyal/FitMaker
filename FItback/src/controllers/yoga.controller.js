import { Yoga } from '../models/yoga.model.js';
import { ApiError } from '../utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { uploadOnCloudinary, uploadImageByUrl } from '../utils/cloudinary.js';

// Create Yoga
const createYoga = asyncHandler(async (req, res) => {
  const { name, instructions, aot, level, imageUrl } = req.body;

  console.log('Received request body:', req.body);
  console.log('Received fields:', { name, instructions, aot, level, imageUrl });
  console.log('Received file:', req.file);

  if (!name || !instructions || !aot || !level) {
    throw new ApiError(400, 'All fields are required');
  }

  let yogaImage;
  try {
    if (req.file) {
      yogaImage = await uploadOnCloudinary(req.file.path);
    } else if (imageUrl) {
      yogaImage = await uploadImageByUrl(imageUrl);
    }
  } catch (error) {
    console.error('Error during image upload:', error);
    throw new ApiError(500, 'Error uploading yoga image');
  }

  const yoga = await Yoga.create({
    name,
    instructions,
    aot: Array.isArray(aot) ? aot : [aot],
    yogaImage: yogaImage?.url || '',
    level
  });

  return res
    .status(201)
    .json(new ApiResponse(201, yoga, 'Yoga created successfully'));
});


// get All Yoga
const getAllYogas = asyncHandler(async (req, res) => {
  try {
    // Fetch all yogas from the database
    const yogas = await Yoga.find();

    // Check if there are yogas available
    if (yogas.length === 0) {
      return res.status(404).json(new ApiResponse(404, null, 'No yogas found'));
    }

    // Return the yogas in the response
    return res.status(200).json(new ApiResponse(200, yogas, 'Yogas fetched successfully'));
  } catch (error) {
    console.error('Error fetching yogas:', error);
    throw new ApiError(500, 'Error fetching yogas');
  }
});

const getYogasByLevel = asyncHandler(async (req, res) => {
  const { level } = req.params;

  if (!level) {
    throw new ApiError(400, 'Level is required');
  }

  // Find yogas by category
  const yogas = await Yoga.find({ level });

  if (yogas.length === 0) {
    throw new ApiError(404, 'No yogas found for this level');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, yogas, 'Yogas fetched successfully'));
});


// Get Yogas by AOT


const getYogasByAot = asyncHandler(async (req, res) => {
  const { aot } = req.params;

  if (!aot) {
    throw new ApiError(400, 'AOT (area of target) is required');
  }

  const yogas = await Yoga.find({ aot: aot });

  if (!yogas.length) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, 'No yogas found for this area of target'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, yogas, 'Yogas fetched successfully'));
});

// Update Yoga
const updateYoga = asyncHandler(async (req, res) => {
  const { id } = req.params;  // Yoga ID from URL params
  const { name, instructions, aot, level, imageUrl } = req.body;

  // Check if the yoga exists
  const yoga = await Yoga.findById(id);
  if (!yoga) {
    throw new ApiError(404, 'Yoga not found');
  }

  // Update fields
  if (name) yoga.name = name;
  if (instructions) yoga.instructions = instructions;
  // Handle 'aot' as an array
  if (aot) {
    yoga.aot = Array.isArray(aot) ? aot : [aot];
  }
  if (level) yoga.level = level;

  // Handle file upload if a new file is provided
  if (req.file) {
    console.log("Uploading new file from device...");
    const yogaImage = await uploadOnCloudinary(req.file.path);
    if (!yogaImage) {
      throw new ApiError(500, 'Error uploading yoga image');
    }
    yoga.yogaImage = yogaImage.url;
  } else if (imageUrl) {
    console.log("Uploading new file from URL...");
    const yogaImage = await uploadImageByUrl(imageUrl);
    if (!yogaImage) {
      throw new ApiError(500, 'Error uploading yoga image');
    }
    yoga.yogaImage = yogaImage.url;
  }

  // Save updated yoga
  await yoga.save();

  return res
    .status(200)
    .json(new ApiResponse(200, yoga, 'Yoga updated successfully'));
});



// Delete Yoga
const deleteYoga = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the yoga by ID and delete it
  const yoga = await Yoga.findByIdAndDelete(id);

  if (!yoga) {
    throw new ApiError(404, 'Yoga not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Yoga deleted successfully'));
});



export { createYoga, getYogasByAot, updateYoga, getYogasByLevel, deleteYoga, getAllYogas };
