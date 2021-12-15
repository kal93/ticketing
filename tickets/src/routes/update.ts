import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotFoundError,
  UnAuthoriedError,
  requireAuthMiddleWare,
  validateRequestMiddleWare,
} from "@ticketjd/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuthMiddleWare,
  [
    body("title").notEmpty().withMessage("Title is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than on zero."),
  ],
  validateRequestMiddleWare,
  async (req: Request, res: Response) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new UnAuthoriedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    const updatedTicket = await ticket.save();
    res.status(200).send(updatedTicket);
  }
);
export { router as updateTicketRouter };
