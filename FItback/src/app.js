//this file use express middlewares
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// configuration
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // extended means you can nested objects
app.use(express.static("public")); // static -- some time we store file folders and asset store in public
app.use(cookieParser()); // To acess and set the user server cookies.
//routes import

app.use("/api/v1/users", userRouter);
export { app };