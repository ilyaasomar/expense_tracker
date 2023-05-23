import express from "express";
import {
  account,
  accounts,
  createAccount,
  deleteAccount,
  updateAccount,
} from "../controller/account.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, accounts);
router.post("/", auth, createAccount);
router.post("/signel_account/:id", auth, account);
router.put("/:id", auth, updateAccount);
router.delete("/:id", auth, deleteAccount);

export default router;
