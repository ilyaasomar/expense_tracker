import express from "express";
const router = express.Router();
import { login, signup, updateUser } from "../controller/users.js";
import auth from "../middleware/auth.js";
router.post("/signin", login);
router.post("/signup", signup);
router.patch("/updateUser/:id", auth, updateUser);
export default router;
