import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@llticketing/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();
const EXPIRATON_WINDOW_SECONDS = 15 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // Checks for valid MongoDB ObjectID
      .withMessage("Ticket ID must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Find ticket
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    // Assert that ticket is not reserved
    const orderExists = await ticket.isReserved();

    if (orderExists) {
      throw new BadRequestError("Ticket is reserved");
    }

    // Generate expiry date

    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + EXPIRATON_WINDOW_SECONDS);

    // Create the order

    const order = Order.build({
      userId: req.currentUser!.id,
      expiresAt: expiryDate,
      status: OrderStatus.Created,
      ticket: ticket,
    });

    await order.save();

    // Publish an event saying that an order was created

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
