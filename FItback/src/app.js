import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import excerciseRouter from "./routes/excercise.route.js";
import blogroute from "./routes/blog.route.js";
import { corsOptions } from "./config/config.js";

const app = express();

// setup to access the permission of the cors
app.use(cors(corsOptions));

// configuration
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// To acess and set the user server cookies.
app.use(cookieParser());

//routes path define
app.use("/api/v1/users", userRouter);
app.use("/api/v1/exercises", excerciseRouter);
app.use("/api/v1/blogs", blogroute);

export { app };
