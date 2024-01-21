
import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  discription: { type: String },
  createdBY: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usermodel",
  },
});

const Taskmodel = mongoose.model("Page", pageSchema);

export default Taskmodel;