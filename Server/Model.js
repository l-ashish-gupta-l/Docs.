import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Email: String,
  Password: String,
});

const Usermodel = mongoose.model("Usermodel", userSchema);

export default Usermodel;
