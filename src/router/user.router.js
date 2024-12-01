import { Router } from "express";
import { register } from "../controllers/user.controller.js";

import { upload } from "../middleware/multer.middleware.js";
const router=Router()



// router.route('/videoUpload').post(
//     upload.any(), // Use 'any' to accept any file, no specific field names needed
//     videoUpload // Controller function to handle the uploaded files
//   );
  
  // Export router
 

router.route("/register").post(upload.any(),register)
// router.route("/register").post(upload.fields([
//     {
//         name:"avatar",
//         maxCount:1
//     },
//     {
//         name:"coverImage",
//         maxCount:1
//     },
// ]),register)

export default router