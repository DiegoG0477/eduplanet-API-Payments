import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/mongodb";

import { orderRouter } from "./order/infrastructure/routes/OrderRouter";
import { clientRouter } from "./order/infrastructure/routes/ClientRouter";

dotenv.config();

const PORT = process.env.SERVER_PORT ?? 3000;

const app = express();

const signale = new Signale();

app.use(express.json());
app.use(morgan("dev"));
app.use("/payment", orderRouter);
app.use("/clients", clientRouter);

app.listen(PORT, async () => {
    await connectToDatabase();
    signale.success("Server online in port " + PORT);
});
