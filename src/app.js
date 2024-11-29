import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.middleware.js";

//cors not implemented intentionally

dotenv.config({
    path: "./.env"
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/",(req,res) => {
    res.status(200).send("Healthy")
})

//Routers import and use
import billRouter from "./routes/bill.route.js";
app.use("/api/v1/bill",billRouter);

import itemRouter from "./routes/item.route.js";
app.use("/api/v1/item",itemRouter);

app.use(errorHandler)

export {app}