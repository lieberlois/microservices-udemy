import request from "supertest";
import { app } from "../../app";

it("can fetch a list of tickets", async () => {
  const ticketData: { title: string; price: number }[] = [
    {
      title: "Ticket 1",
      price: 10,
    },
    {
      title: "Ticket 2",
      price: 20,
    },
    {
      title: "Ticket 3",
      price: 30,
    },
  ];

  ticketData.forEach(async ({ title, price }) => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ title, price });
  });

  const response = await request(app).get("/api/tickets").send();
  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(ticketData.length);
});
