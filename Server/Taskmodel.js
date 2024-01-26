import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  discription: { type: String },
  createdBY: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usermodel",
  },
  file: {
    type: String,
    default: null,
  },
  fileName: {
    type: String,
    default: null,
  },
  fileType: {
    type: String,
    default: null,
  },
});

const Taskmodel = mongoose.model("Page", pageSchema);

export default Taskmodel;
