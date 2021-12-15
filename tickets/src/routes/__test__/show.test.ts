import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

it("returns a 404 if ticket is not found", async () => {
  const randomId = new mongoose.Types.ObjectId().toHexString(); // looking up by a mongoDb id which is a 16 char hex string
  const response = await request(app)
    .get(`/api/tickets/${randomId}`)
    .set("Cookie", global.signIn())
    .send();
  expect(response.status).toEqual(404);
});

it("returns a ticket if ticket found", async () => {
  const title = "Sample title";
  const price = 10;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      price,
      title,
    });
  expect(response.status).toEqual(201);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signIn())
    .send();
  expect(ticketResponse.status).toEqual(200);
  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
