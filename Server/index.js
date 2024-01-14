import express from "express";
import cors from "cors";
import connectdb from "./database.js";
import Usermodel from "./Model.js";

const app = express();
app.use(cors());

connectdb();

app.get("/", (req, res) => {
  res.send(" SERVER HOME PAGE ");
});

app.get("/created", async (req, res) => {
  const data = await Usermodel.create({
    Email: "String",
    Password: "String",
  });
  res.send(data);
});

app.listen(5000, () => {
  console.log("server is running on port 5000 ");
});
