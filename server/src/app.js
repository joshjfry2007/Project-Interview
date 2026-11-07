import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { notFound } from "./middleWare/notFound.js/index.js";
import { errorHandler } from "./middleWare/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || process.env.CLIENT_URL || "http://localhost:3000",
}));

app.use(express.json({limit : "1mb"}));

app.get("/api/health", (req,res) => {
    res.status(200).json({
        success : true,
        message: "Interview API is running",
    });
});

app.use(notFound);
app.use(errorHandler);

export default app;