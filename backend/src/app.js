import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "AI Meeting Intelligence API Running",
  });
});

/* =========================
   API ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/meetings",
  meetingRoutes
);

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.log(
      "SERVER ERROR:"
    );

    console.log(err);

    res.status(500).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error",
    });
  }
);

export default app;