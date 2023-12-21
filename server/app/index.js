import express from "express";
import http from "http";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";

import to_doRouter from "./routes/to_doRoutes.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  reconnection: false,
});

app.use(cors());

app.use(express.json());

dotenv.config();

export const db = mysql.createPool({
  host: "mysql-container",
  user: "root",
  password: "C@t@p@ult1",
  database: "to_do",
});



app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.use("/todo", to_doRouter);

io.on("connection", (socket) => {
  console.log("User connected");

  // Listen for disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { io };

server.listen(process.env.PORT, () => {
  console.log("connected to backend");
});
