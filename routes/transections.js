import express from "express";
import {
  checkStatement,
  createTransection,
  deleteTransection,
  getSingleTransSection,
  getTransactionByDate,
  getTransections,
  updateTransection,
} from "../controller/transections.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getTransections);
router.post("/", auth, createTransection);
router.post("/singleTransection/:id", auth, getSingleTransSection);
router.put("/:id", auth, updateTransection);
router.post("/getTransactionByDate", auth, getTransactionByDate);
router.post("/checkStatement", auth, checkStatement);
router.delete("/:id", auth, deleteTransection);

export default router;
