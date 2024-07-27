//This file use express middlewares
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();

// setup to access the permission of the cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);



// configuration
app.use(express.json({ limit: "30kb" }));
 // extended means you can nested objects
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// static -- some time we store file folders and asset store in public
app.use(express.static("public")); 

// To acess and set the user server cookies.
app.use(cookieParser()); 


//routes path define
// 1. user route path
app.use("/api/v1/users", userRouter);

// 2. exercise route path


//3. yoga route path


//4. Admin route path
export { app };
