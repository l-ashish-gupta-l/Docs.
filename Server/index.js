import express from "express";
import cors from "cors";
import connectdb from "./database.js";
import Usermodel from "./Model.js";

const app = express();
app.use(cors());
app.use(express.json());
connectdb();

app.get("/", (req, res) => {
  res.send(" SERVER HOME PAGE ");
});

app.post("/login", async (req, res) => {
  const data = await Usermodel.create({
    Email: req.body.Email,
    Password: req.body.Password,
  });
  
});

app.listen(5000, () => {
  console.log("server is running on port 5000 ");
});
