import jwt from "jsonwebtoken";
import Usermodel from "../Models/UserModel.js";
import Taskmodel from "../Models/Taskmodel.js";
import bcrypt from "bcryptjs";
import pdfkit from "pdfkit";
import fs from "fs";
import fileuploadonCloudinary from "../middleware/Cloudinary.js";

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

const WorkspaceRoute = async (req, res) => {
  const workspace = await Taskmodel.find({ createdBY: req.user._id });
  res.json(workspace);
};

const RegisterRoute = async (req, res) => {
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

      // Set CORS headers
      res.header(
        "Access-Control-Allow-Origin",
        "https://docs-ten-sepia.vercel.app/"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Credentials", "true");

      res.cookie("Token", token, { maxAge: 3600000 });

      return res
        .status(200)
        .json({ message: "Registration successful", user: newUser });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const LoginRoute = async (req, res) => {
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
    res.cookie("Token", token, { httpOnly: true, httpsecure: true });
    return res.send(verified);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const LogoutRoute = (req, res) => {
  try {
    const a = res.clearCookie("Token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const TaskcreatedRoute = async (req, res) => {
  try {
    const { Title, Discription } = req.body;
    const fileUrl = req.file
      ? (await fileuploadonCloudinary(req.file.path)).url
      : null;

    if (req.file) {
      // console.log(req.file.path);
      fs.unlinkSync(req.file.path);
    }
    const Task = await Taskmodel.create({
      title: Title,
      discription: Discription,
      createdBY: req.user._id,
      file: fileUrl,
      fileName: req.file ? req.file.filename : null,
      fileType: req.file ? req.file.mimetype : null,
    });

    res.status(201).send(Task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdatedTaskRoute = async (req, res) => {
  try {
    // Assuming your Taskmodel has a 'file' field to store file information
    // console.log(req.body.file, req.body.fileType, req.body.fileName);
    const fileUrl = req.file
      ? (await fileuploadonCloudinary(req.file.path)).url
      : null;

    if (req.file) {
      // console.log(req.file.path);
      fs.unlinkSync(req.file.path);
    }
    const updatedTask = await Taskmodel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        discription: req.body.discription,
        file: fileUrl,
        fileType: req.body.fileType,
        fileName: req.body.fileName,
      },
      { new: true }
    );

    res.send(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GeneratepdfRoute = async (req, res) => {
  try {
    const document = await Taskmodel.findById(req.params.documentId);

    // Create a PDF using pdfkit
    const doc = new pdfkit();
    doc.text(JSON.stringify(document)); // Customize this based on your document structure

    // Pipe the PDF to the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=Generated.pdf");
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const DeleteRoute = async (req, res) => {
  try {
    // console.log(req.params.id);
    const task = await Taskmodel.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UpdatePageRoute = async (req, res) => {
  try {
    const task = await Taskmodel.findById(req.params.id);
    res.send(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const FileDeletedRoute = async (req, res) => {

// };

export {
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
};
