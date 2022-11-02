import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log(`Listner connected to NATs`, new Date().toLocaleString());

  stan.on("close", () => {
    console.log(`NATs connection closed!`, new Date().toLocaleString());
    process.exit();
  });
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("order-service");

  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(
        `Received event #${msg.getSequence()} with data ${data}`,
        new Date().toLocaleString()
      );
    }
    msg.ack();
    // console.log(`Received message/event: ${msg}`, new Date().toLocaleString());
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());