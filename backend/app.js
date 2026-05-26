import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import session from "express-session";
import Notice from "./models/notice.js";
import isLoggedIn from "./middleware/isLoggedIn.js";
import isLoggedOut from "./middleware/isLoggedOut.js";  

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));

connectDB();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../frontend")));

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

app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store"
  );
  next();
});

app.use((req, res, next) =>{
  res.locals.user = req.session.user || null;

  next();
});

app.use("/", authRoutes);

//home
app.get("/", (req, res) => {
    res.render("index");
});

//logged in 
app.get("/login", isLoggedOut, (req, res) => {
  res.sendFile(
        path.join(
            __dirname,
            "../frontend/pages/login.html"
        )
    );
});

//register
app.get("/register", isLoggedOut, (req, res) => {
   res.sendFile(path.join(__dirname, "../frontend/pages/register.html"));
})

//dashboard route
app.get("/dashboard", isLoggedIn, async (req, res) => {
  //check session
  const notices = await Notice.find();
  
  res.render("dashboard", {notices});
});

//profile section
app.get("/dashboard/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

//admin 
app.post("/add-notice", async(req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();

    res.redirect("/dashboard");
  } catch(err) {
    console.log(err);
    res.send("failed to add notice");
  }
})

app.listen(3000, () => {
    console.log("Server running");
});