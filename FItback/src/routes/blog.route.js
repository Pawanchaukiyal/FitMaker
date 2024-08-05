import { Router } from 'express';
import { createBlog } from '../controllers/blog.controller.js';
import { upload } from '../middleware/multer.middleware.js'; // Assuming multer configuration for file uploads
import { isAdmin, verifyJWT } from '../middleware/Auth.Middleware.js'; // Middleware for authentication and admin check

const router = Router();

// Apply JWT verification to all routes in this router
router.use(verifyJWT);

// Route to create a new blog, accessible by both users and admins
router.route('/create').post(upload.single('blogImage'), createBlog);

export default router;
