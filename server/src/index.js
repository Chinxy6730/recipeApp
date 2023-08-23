import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();

const app = express();
const dbPassword = process.env.MONGODB_CONNECTION;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(process.env.URI, { useNewUrlParser: true });

app.listen(3001, () => console.log("SERVER HAS STARTED ON PORT 3001!!!"));
