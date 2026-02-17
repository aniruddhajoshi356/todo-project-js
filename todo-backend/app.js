const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api/todos", todoRoutes);

module.exports = app;
