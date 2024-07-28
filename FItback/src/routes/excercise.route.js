import { Router } from "express";
import {
  getExercise,
  getExerciseById,
} from "../controllers/excercise.controller.js";

const router = Router();

router.route("/category").get(getExercise);
router.route("/:categoryId").get(getExerciseById);

export default router;
