import mongoose from "mongoose";
import chalk from "chalk";

import { app } from "./app";

const log = console.log;

const start = async () => {
  // Before starting the app, throw an error if env variable is not set
  if (!process.env.JWT_KEY) {
    throw new Error(
      "Env variable JWT_KEY must be defined.Verify depl yaml files and k8 secrets."
    );
  }
  if (!process.env.MONGO_URI) {
    throw new Error(
      "Env variable MONGO_URI must be defined.Verify depl yaml files and k8 configs."
    );
  }
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/auth');
    await mongoose.connect(process.env.MONGO_URI); // check cluster ip service for mongodb for url
    log("Connected to tickets Mongo DB", process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    log(chalk.bgGreenBright.bold.black("\t\n Auth running on port 3000 \n"));
  });
};

start();
