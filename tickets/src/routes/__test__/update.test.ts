import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

it("return 404 if provided id does not exist", async () => {
  const randomId = new mongoose.Types.ObjectId().toHexString(); // looking up by a mongoDb id which is a 16 char hex string
  const response = await request(app)
    .put(`/api/tickets/${randomId}`)
    .set("Cookie", global.signIn())
    .send({
      title: "Updated title",
      price: 11,
    });
  expect(response.status).toEqual(404);
});

it("returns 401 if user is not authenticated", async () => {
  const title = "Sample title";
  const price = 10;
  const response = await request(app).post("/api/tickets").send({
    price,
    title,
  });
  expect(response.status).toEqual(401);
});

it("return 401 if user does not own the ticket", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signIn())
    .send({
      title: "Some valid title",
      price: 22,
    });
  const ticketId = response.body.id;
  const r = await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", global.signIn())
    .send({
      title: "Some valid title",
      price: 33,
    });
  expect(r.status).toEqual(401);
});

it("return 400 if user provides invalid title or price", async () => {
  const cookie = global.signIn();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "Some title",
      price: 22,
    });
  const ticketId = response.body.id;
  const r = await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 33,
    });
  expect(r.status).toEqual(400);
});

it("updates the ticket provided valid input", async () => {
  const cookie = global.signIn();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "Some title",
      price: 22,
    });
  const ticketId = response.body.id;
  const r = await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send({
      title: "Some updated title",
      price: 1111,
    });
  expect(r.status).toEqual(200);

  const ticketReponse = await request(app)
    .get(`/api/tickets/${r.body.id}`)
    .set("Cookie", cookie)
    .send();
  expect(ticketReponse.body.title).toEqual("Some updated title");
  expect(ticketReponse.body.price).toEqual(1111);
});
