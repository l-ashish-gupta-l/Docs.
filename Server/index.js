import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./database.js";
import Usermodel from "./Model.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(cookieParser());
app.use(express.json());
connectdb();

app.get("/", (req, res) => {
  res.send(" SERVER HOME PAGE ");
});

app.post("/register", async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    const existingUser = await Usermodel.findOne({ Email: Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const newUser = await Usermodel.create({
        Username,
        Email,
        Password: hashedPassword,
      });
      const token = jwt.sign(hashedPassword, process.env.jwt_secret);
      res.cookie("Token", token, { maxAge: 3600000 });
      return res
        .status(200)
        .json({ message: "Registration successful", user: newUser });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { Username, Email, Password } = req.body;
  try {
    const entertered_user = await Usermodel.findOne({ Email: req.body.Email });

    if (!entertered_user) {
      return res.status(404).json({ message: "User not found" });
    }

    let verified = await bcrypt.compare(
      req.body.Password,
      entertered_user.Password,
    );
    res.send(verified);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
 
app.listen(PORT, () => {
  console.log("server is running on port 5000 ");
});
