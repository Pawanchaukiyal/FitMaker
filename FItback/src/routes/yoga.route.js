import { Router } from "express";
import {
  createYoga,
  getYogaByLevel,
  getYogaByAot,
  updateYoga,
  deleteYoga,
  getAllYoga,
} from "../controllers/yoga.controller.js";
import { upload } from "../middleware/multer.middleware.js"; // Assuming multer configuration is in utils
import { isAdmin, verifyJWT } from "../middleware/Auth.Middleware.js";

const router = Router();
router.route("/all").get(getAllYoga);
router.route("/level/:level").get(getYogaByLevel); // New route for category-based queries
router.route("/aot/:aot").get(getYogaByAot); // New route for getting exercises by AOT

// Apply the middleware to routes that require admin access
router.use(verifyJWT); // Apply JWT verification to all routes in this router
router.route("/create").post(upload.single("yogaImage"), createYoga);

router
  .route("/update/:id")
  .put(isAdmin, upload.single("yogaImage"), updateYoga);
router.route("/delete/:id").delete(isAdmin, deleteYoga);

export default router;
