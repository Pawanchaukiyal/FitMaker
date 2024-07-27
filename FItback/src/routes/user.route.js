import { Router } from "express";
import { registerUser } from "../controllers/User.Controllers.js";

// import { verifyJWT } from "../middleware/Auth.Middleware.js";

const router = Router();
router.route("/register").post(registerUser);

export default router;
