import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import chalk from "chalk";

import {
  errorHandler,
  NotFoundError,
  currentUserMiddleWare,
} from "@ticketjd/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const log = console.log;

const app = express();
// Set  trust proxy because traffic is being proxied to this app thro' ingress-nginx load balancer.
// Express is aware by default of proxy connections. So make it trusted one.
app.set("trust proxy", true);
app.use(json());

const ISDEV = process.env.NODE_ENV === "dev";
const ISTEST = process.env.NODE_ENV === "test";

const ISPROD = ISDEV || ISTEST ? false : true;

app.use(
  cookieSession({
    // disable encryption as we'll be using JWT inside the cookie
    signed: false,
    secure: ISPROD, // setting it to true only allows for https connections.
  })
);
app.use(currentUserMiddleWare);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
