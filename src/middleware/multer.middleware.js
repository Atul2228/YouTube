
import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {

    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
   
    cb(null, true);
  },
});


