import { videoUpload } from "../controllers/video.controller.js";
import Router from "express"
import { upload } from "../middleware/multer.middleware.js";



const router = Router();

// Use upload.any() to accept any files from the request
router.route('/videoUpload').post(
  upload.any(), // Use 'any' to accept any file, no specific field names needed
  videoUpload // Controller function to handle the uploaded files
);

// Export router
export default router;
