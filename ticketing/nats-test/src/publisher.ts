import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
console.clear();

const stan = nats.connect("ticketing", "abc", {
  // kubectl port-forward nats-pod-name 4222:4222
  // kubectl port-forward nats-pod-name 8222:8222
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS Streaming Server");

  const data = {
    id: "123",
    title: "concert",
    price: 20,
  };

  const publisher = new TicketCreatedPublisher(stan);
  setInterval(async () => {
    await publisher.publish(data);
  }, 1000);
});
