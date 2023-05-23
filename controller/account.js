import mongoose from "mongoose";
import Account from "../models/Accounts.js";
// get all accounts
export const accounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).send(accounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// create account
export const createAccount = async (req, res) => {
  const { account_no, account_name, bank_name, amount, description } = req.body;
  try {
    // check if action is already exists
    const oldAccount = await Account.findOne({ account_no });
    if (oldAccount) {
      return res.status(404).json({ message: "Account Already Exists" });
    }
    const accountData = await Account.create({
      account_no,
      account_name,
      bank_name,
      balance: amount,
      description,
      user_id: req.userId,
    });
    res.status(201).json(accountData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// get signle account
export const account = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Account ID" });
    }
    const account = await Account.findById(id);
    res.status(200).send(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// update account
export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { account_no, account_name, bank_name, amount, description } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Account ID" });
    }
    const data = {
      account_no,
      account_name,
      bank_name,
      balance: amount,
      description,
      user_id: req.userId,
    };
    const updatedData = await Account.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    res.status(201).json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Account ID" });
    }
    await Account.findByIdAndDelete(id);
    res.status(200).json("Account Deleted Successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
