import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./database.js";
import cookieParser from "cookie-parser";
import multerfileupload from "./middleware/Multer.js";
import Taskmodel from "./Models/Taskmodel.js";

import {
  isAuthenticate,
  WorkspaceRoute,
  RegisterRoute,
  LoginRoute,
  LogoutRoute,
  TaskcreatedRoute,
  UpdatedTaskRoute,
  GeneratepdfRoute,
  DeleteRoute,
  UpdatePageRoute,
  // FileDeletedRoute,
} from "./Controllers/Controllers.js";

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

app.post("/register", RegisterRoute);

app.post("/login", LoginRoute);

app.get("/logout", LogoutRoute);

app.post("/userdata", isAuthenticate, async (req, res) => {
  res.send(req.user);
});
app.get("/workspace", isAuthenticate, WorkspaceRoute);

app.post(
  "/taskcreated",
  isAuthenticate,
  multerfileupload.single("file"),
  TaskcreatedRoute
);

app.patch("/updatetask/:id", isAuthenticate, UpdatedTaskRoute);
app.get("/updatepage/:id", isAuthenticate, UpdatePageRoute);

app.delete("/delete/:id", isAuthenticate, DeleteRoute);

app.delete("/deleteFile/:id", isAuthenticate, async (req, res) => {
  // console.log(req.params.id);
  const delTask = await Taskmodel.findByIdAndUpdate(
    req.params.id,
    { $unset: { file: 1, fileName: null, fileType: null } },
    { new: true }
  );
    res.status(200).send(delTask);
    
});

app.get("/generate-pdf/:documentId", isAuthenticate, GeneratepdfRoute);

app.listen(PORT, () => {
  console.log("server is running on port 5000 ");
});
