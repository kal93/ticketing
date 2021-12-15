import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("has a route handler listening to /api/tickets for POST request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be access if user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).toEqual(401);
});
it("can access if user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({});
  expect(response.status).not.toEqual(401);
});
it("returns an error if invalid title is provided", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      price: 10,
      title: "",
    });
  expect(response.status).toEqual(400);
});
it("return an error if invalid price is provided", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "Boo",
      price: -10,
    });
  expect(response.status).toEqual(400);
});
it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({}); // check how many tickets are in DB. We delete all records in db in beforeEach.See setup.ts
  expect(tickets.length).toEqual(0);
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      price: 10,
      title: "Sample title",
    });
  expect(response.status).toEqual(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
