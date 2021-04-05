import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  return await ticket.save();
};

it("should return 404 when order does not exist", async () => {
  await request(app)
    .get("/api/orders/" + mongoose.Types.ObjectId())
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});

it("should return 403 when order does belong to the current user", async () => {
  const ticket = await buildTicket();

  const order = await Order.build({
    expiresAt: new Date(),
    status: OrderStatus.Created,
    ticket: ticket,
    userId: "123123123",
  }).save();

  await request(app)
    .get("/api/orders/" + order.id)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});

it("should successfully get an order that belongs to the user", async () => {
  const ticket = await buildTicket();
  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get("/api/orders/" + order.id)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toBe(order.id);
});
