import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuthMiddleWare,
  validateRequestMiddleWare,
} from "@ticketjd/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuthMiddleWare,
  [
    body("title").notEmpty().withMessage("Title is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than zero."),
  ],
  validateRequestMiddleWare,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const newTicket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    const createdTicket = await newTicket.save();
    res.status(201).send(createdTicket);
  }
);

export { router as createTicketRouter };
