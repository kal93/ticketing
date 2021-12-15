import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../app";

declare global {
  var signIn: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "thisisme";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri(); // url on localhost with random port
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.signIn = () => {
  // build a jwt payload
  const payLoad = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  // create a jwt
  const token = jwt.sign(payLoad, process.env.JWT_KEY!);
  // build session object {jwt: jwt_val}
  const session = { jwt: token };
  // take the object and base64 encode it
  const sessionJson = JSON.stringify(session);
  const base64 = Buffer.from(sessionJson).toString("base64");
  // return the base64 encoded string
  return [`express:sess=${base64}`];
};
