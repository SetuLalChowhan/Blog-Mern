import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/user.route.js'

import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use('/api/user',userRoutes);

app.listen(3000, () => {
  console.log("Server is runnig on port 3000");
});

