import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  // kubectl port-forward nats-56554d5c77-9dz59 4222:4222
  // kubectl port-forward nats-56554d5c77-9dz59 8222:8222
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS Streaming Server");

  stan.on("close", () => {
    console.log("NATS Streaming Server connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
