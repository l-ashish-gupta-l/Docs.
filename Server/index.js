import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/login", (req, res) => {
  res.send(" LOged in ");
});

app.listen(5000, () => {
  console.log("server is running ");
});
