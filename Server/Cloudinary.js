import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileuploadonCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    const fileuploaded = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    console.log("file uploded succefully on cloudinary", fileuploaded.url);
    return fileuploaded;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
  }
};


export default fileuploadonCloudinary;
