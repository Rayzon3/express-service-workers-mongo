import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (_, res) => res.send("Hello World!"));

app.listen(PORT, async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/no-app-db");
    console.log(`Server running on PORT: ${PORT}`);
    console.log("Database Connected 🚀");
  } catch (error) {
    console.log(error);
  }
});
