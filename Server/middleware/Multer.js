import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Fileuploaded");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multerfileupload = multer({ storage: storage });

export default multerfileupload;
