import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./database.js";
import Usermodel from "./Model.js";

const PORT = process.env.PORT;
const app = express();
app.use(cors());
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
  console.log(req.body);
});

app.post("/login", async (req, res) => {
  const data = await Usermodel.findOne({ Email: req.body.Email });
  res.send(data);
});

app.listen(PORT, () => {
  console.log("server is running on port 5000 ");
});
