import { Router } from "express";
import { uploadContacts } from "../controller/user.controller";
import auth from "../middleware/auth";
import { upload } from "../middleware/multerUploads";



const router = Router();

router.post("/uploadContacts", auth, upload.single("file") ,uploadContacts)



export default router;