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
import fileuploadonCloudinary from "./Cloudinary.js";
import multerfileupload from "./middleware/Multer.js";
import fs from "fs";

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

app.post("/userdata", isAuthenticate, async (req, res) => {
  res.send(req.user);
  // console.log(req.user);
});
app.get("/workspace", isAuthenticate, async (req, res) => {
  const user = req.user;
  const workspace = await Taskmodel.find({ createdBY: user._id });
  res.json(workspace);
});

app.post(
  "/taskcreated",
  isAuthenticate,
  multerfileupload.single("file"),
  async (req, res) => {
    try {
      const { Title, Discription } = req.body;
      console.log(req.file);
      const fileUrl = req.file
        ? (await fileuploadonCloudinary(req.file.path)).url
        : null;

      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      const Task = await Taskmodel.create({
        title: Title,
        discription: Discription,
        createdBY: req.user._id,
        file: fileUrl,
        fileName: req.file.filename,
        fileType: req.file.mimetype,
      });

      res.status(201).send(Task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("/updatepage/:id", async (req, res) => {
  try {
    const task = await Taskmodel.findById(req.params.id);
    res.send(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/updatetask/:id", isAuthenticate, async (req, res) => {
  try {
    const updatedTask = await Taskmodel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        discription: req.body.discription,
      },
      { new: true }
    );
    res.send(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete/:id", isAuthenticate, async (req, res) => {
  try {
    console.log(req.params.id);
    const task = await Taskmodel.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("server is running on port 5000 ");
});
