import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const db_URI = process.env.URI;
const connectdb = () => {
  mongoose.connect(db_URI);
};

export default connectdb;
