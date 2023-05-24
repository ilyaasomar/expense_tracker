import mongoose from "mongoose";
import General from "../models/General.js";
export const actions = async (req, res) => {
  try {
    const actionData = await General.find();
    res.status(200).send(actionData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const createAction = async (req, res) => {
  const { action_name, general_type } = req.body;
  try {
    // check if action is already exists
    const oldAction = await General.findOne({ action_name });
    if (oldAction) {
      return res.status(404).json({ message: "Action Already Exists" });
    }
    const actionData = await General.create({ action_name, general_type });
    res.status(201).json(actionData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get single action
export const action = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Account ID" });
    }
    const action = await General.findById(id);
    res.status(200).send(action);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// get actions by type
export const getByType = async (req, res) => {
  const { name } = req.params;
  try {
    const action = await General.find().where({ general_type: name });
    if (!action) {
      return res.status(404).json({ message: "No Action Found" });
    }
    res.status(200).json(action);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// update
export const updateAction = async (req, res) => {
  const { id } = req.params;
  const { action_name, general_type } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Account ID" });
    }
    const data = {
      action_name,
      general_type,
      user_id: req.userId,
    };
    const updatedData = await General.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    res.status(201).json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// delete action
export const deleteAction = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Account ID" });
    }
    await General.findByIdAndDelete(id);
    res.status(200).json("Action Deleted Successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
