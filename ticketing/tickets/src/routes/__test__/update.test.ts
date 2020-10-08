import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("can only be accessed if the user is signed in", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "aslkdfj",
      price: 20,
    })
    .expect(401);
});

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "aslkdfj",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const title = "Titel";
  const price = 10;

  const ticketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    });

  await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "Titel 2",
      price: 20,
    })
    .expect(401);

  const response = await request(app)
    .get(`/api/tickets/${ticketResponse.body.id}`)
    .send();

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();
  const ticketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: -10,
    })
    .expect(400);
});

it("updates the ticket with valid inputs", async () => {
  const newTitle = "Title 2";
  const newPrice = 40;
  const cookie = global.signin();

  const ticketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: newTitle,
      price: newPrice,
    })
    .expect(200);

  const response = await request(app)
    .get(`/api/tickets/${ticketResponse.body.id}`)
    .send();

  expect(response.body.title).toEqual(newTitle);
  expect(response.body.price).toEqual(newPrice);
});
