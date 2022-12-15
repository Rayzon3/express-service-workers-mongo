import { Router } from "express";
import { login, logout, register } from "../controller/auth.controller";
import auth from "../middleware/auth";



const router = Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", auth, logout)


export default router;