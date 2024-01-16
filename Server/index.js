import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./database.js";
import Usermodel from "./Model.js";
import cookieParser from "cookie-parser";

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
  const data = await Usermodel.create({
    Username: req.body.Username,
    Email: req.body.Email,
    Password: req.body.Password,
  });
  res.cookie("token", "ashish", {
    httpOnly: true,
  });  
  res.send(data)
  console.log("created")
});


app.post("/login", async (req, res) => {
  const data = await Usermodel.findOne({ Email: req.body.Email });
  
  res.send(data);
});

app.listen(PORT, () => {
  console.log("server is running on port 5000 ");
});
