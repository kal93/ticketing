import mongoose from "mongoose";

/**
 * Interface that describe props needed to create a new ticket.
 */
export interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}
/**
 * Interface that describes props a ticket has when retrieved from mongodb.
 * This will contain the additional props added by mongodb.
 */
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

/**
 *Describes props a ticket model has.
 Used to provide types to TS to allow for functions on mongoose's statics object
 */
export interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
