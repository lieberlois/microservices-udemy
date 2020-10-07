import { requireAuth, validateRequest } from "@llticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").trim().not().isEmpty().withMessage("Title must be valid"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than zero"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const userId = req.currentUser!.id;
    const ticket = Ticket.build({
      title,
      price,
      userId,
    });
    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
