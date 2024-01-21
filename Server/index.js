import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./database.js";
import Usermodel from "./UserModel.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Taskmodel from "./Taskmodel.js";
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

const isAuthenticate = async (req, res, next) => {
  const token = req.cookies.Token;
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    const user = await Usermodel.findOne({ _id: decoded.userid });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
   



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
      const userid = newUser._id;
      const token = jwt.sign({ userid }, process.env.jwt_secret);
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
      entertered_user.Password
    );
    const userid = entertered_user._id;
    const token = jwt.sign({ userid }, process.env.jwt_secret);
    res.cookie("Token", token, { maxAge: 3600000, httpsecure: true });
    return res.send(verified);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/userdata",isAuthenticate , async (req, res) => {
  res.send(req.user);
  console.log(req.user)
});

app.post("/taskcreated", isAuthenticate, async (req, res) => {
  const { Title, Discription } = req.body;
  console.log(req.user);
  const Task = await Taskmodel.create({
    title: Title,
    discription: Discription,
    createdBY: req.user._id,
  });
  res.send(Task);
});
//abb ky krna h tumhe ek fucction banana h authenticate krek jo deckhe ki agr token h to us user k data req.user me save krde .. aur nhi h to error  pass krde . .. 

app.listen(PORT, () => {
  console.log("server is running on port 5000 ");
});
