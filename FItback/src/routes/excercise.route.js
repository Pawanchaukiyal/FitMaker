import { Router } from 'express';
import { createExercise, deleteExercise, getAllExercises, getExercisesByAot, getExercisesByCategory, updateExercise } from '../controllers/excercise.controller.js';
import { upload } from '../middleware/multer.middleware.js'; // Assuming multer configuration is in utils
import { isAdmin, verifyJWT } from '../middleware/Auth.Middleware.js';

const router = Router();
router.route('/all').get(getAllExercises); 
router.route('/category/:category').get(getExercisesByCategory); // New route for category-based queries
router.route('/aot/:aot').get(getExercisesByAot); // New route for getting exercises by AOT

// Apply the middleware to routes that require admin access
router.use(verifyJWT); // Apply JWT verification to all routes in this router

router.route('/create').post(isAdmin, upload.single('exerciseImage'), createExercise);
router.route('/update/:id').put(isAdmin, upload.single('exerciseImage'), updateExercise);
router.route('/delete/:id').delete(isAdmin, deleteExercise);

export default router;