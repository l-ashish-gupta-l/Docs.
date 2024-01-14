
import mongoose from "mongoose";

const connectdb = () => {
  
  mongoose.connect("mongodb://127.0.0.1:27017/docs");
}

export default connectdb;

