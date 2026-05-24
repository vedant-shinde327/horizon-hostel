import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import session from "express-session";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "horizonSecretKey",
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.send("sangita");
});
app.get("/test-session", (req, res) => {
  res.send(req.session.user);
});
    
app.listen(3000, () => {
    console.log("Server running");
});