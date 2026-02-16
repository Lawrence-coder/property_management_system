import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/Uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    // Creates a unique filename: timestamp-originalname
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage: storage });