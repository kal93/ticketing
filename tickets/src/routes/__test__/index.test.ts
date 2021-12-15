import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  return request(app)
    .post("/api/tickets/")
    .set("Cookie", global.signIn())
    .send({
      title: "Ticket 1",
      price: 100,
    });
};
it("can fetch list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
    .get("/api/tickets/")
    .set("Cookie", global.signIn())
    .send();

  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(3);
});
