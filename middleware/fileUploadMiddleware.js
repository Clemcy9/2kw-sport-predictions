import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
// save uploads to /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export const upload = multer({ storage });
