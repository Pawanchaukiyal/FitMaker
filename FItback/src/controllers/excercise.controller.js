// exerciseController.js

import { Exercise } from "../models/exercise.models.js"; // Import the exercise model

// Get exercises by category
const getExercise = async (req, res) => {
  try {
    
    const exercises = await Exercise.find();
    
    res.json(exercises);
    console.log(exercises)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getExerciseById = async (req, res) => {
    const { ExerciseId } = req.params;
    console.log(ExerciseId)
    try {
      const exercises  = await  Exercise.findById(ExerciseId);
      console.log(exercises)
      if (!exercises ) return res.status(404).json({ message: "Product not found" });
      res.json(exercises );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

export {getExercise,getExerciseById}
