
import Blog from '../models/blog.model.js';
import { ApiError } from '../utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { uploadOnCloudinary, uploadImageByUrl } from '../utils/cloudinary.js';


// Create Blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, imageUrl, heading, views } = req.body;

  // Check if required fields are provided
  if (!title || !content || !heading) {
    throw new ApiError(400, 'Title, content, and heading are required');
  }

  // Handle image upload if an image URL is provided
  let blogImage = '';
  if (imageUrl) {
    blogImage = await uploadImageByUrl(imageUrl);
    if (!blogImage) {
      throw new ApiError(500, 'Error uploading image from URL');
    }
  } else if (req.file) {
    blogImage = await uploadOnCloudinary(req.file.path);
    if (!blogImage) {
      throw new ApiError(500, 'Error uploading exercise image');
    }
  }

  // Determine who is creating the blog
  const writtenBy = req.user?.isAdmin ? 'admin' : 'user';

  // Create new blog
  const blog = await Blog.create({
    title,
    content,
    imageUrl: blogImage?.url || '',
    heading,
    views: views || 0, // Default views to 0 if not provided
    writtenBy
  });

  return res
    .status(201)
    .json(new ApiResponse(201, blog, 'Blog created successfully'));
});

export { createBlog };
