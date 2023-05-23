import express from "express";
import {
  createAction,
  actions,
  action,
  updateAction,
  deleteAction,
} from "../controller/general.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, actions);
router.post("/", auth, createAction);
router.post("/single_action/:id", auth, action);
router.put("/:id", auth, updateAction);
router.delete("/:id", auth, deleteAction);
export default router;
