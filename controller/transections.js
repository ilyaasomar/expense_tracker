import TransectionModel from "../models/Transections.js";
import Account from "../models/Accounts.js";
import mongoose from "mongoose";
// import moment from "moment";
// get all transections
export const getTransections = async (req, res) => {
  const transections = await TransectionModel.find()
    .where({
      createdby: req.userId,
    })
    .sort({ registred_date: -1 });
  res.status(200).json(transections);
};

// transection creation
export const createTransection = async (req, res) => {
  const {
    transection_type,
    action_id,
    amount,
    account_id,
    registred_date,
    description,
  } = req.body;
  try {
    if (
      !transection_type &&
      !action_id &&
      !amount &&
      !account_id &&
      !registred_date &&
      !description
    ) {
      return res.status(401).json({ message: "All fields are mendatory" });
    } else {
      if (!mongoose.Types.ObjectId.isValid(account_id)) {
        return res.status(400).json({ message: "Account not found" });
      }
      // check account balance
      const account = await Account.findById(account_id);
      let balance = account.balance;
      if (transection_type === "income") {
        const data = await TransectionModel.create({
          transection_type,
          action_id,
          amount,
          account_id,
          registred_date,
          description,
          createdby: req.userId,
        });
        balance = balance += amount;
        // update account balance
        if (data) {
          await Account.findByIdAndUpdate(account_id, {
            $set: { balance: balance },
            new: true,
          });
        }
        res.status(200).json(data);
      } else if (transection_type === "expense") {
        if (balance.length === 0) {
          res.status(404).json("You don't have a income");
        } else if (balance < amount) {
          res
            .status(404)
            .json(
              `You don't have a sufficient amount. Your balance is only $${balance}`
            );
        } else {
          const data = await TransectionModel.create({
            transection_type,
            amount,
            account_id,
            registred_date,
            description,
            createdby: req.userId,
          });
          balance = balance -= amount;
          // update account balance
          if (data) {
            await Account.findByIdAndUpdate(account_id, {
              $set: { balance: balance },
              new: true,
            });
          }
          res.status(200).json(data);
        }
      } else {
        res.status().json("unknown error");
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get single transection
export const getSingleTransSection = async (req, res) => {
  const { id } = req.params;
  try {
    const transection = await TransectionModel.findById(id).where({
      createdby: req.userId,
    });
    if (!transection) {
      return res.status(404).json({ message: "No transection found" });
    } else {
      return res.status(200).json(transection);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update transection
export const updateTransection = async (req, res) => {
  const { id } = req.params;
  const { transection_type, amount, account_id, registred_date, description } =
    req.body;
  try {
    if (!transection_type && !amount && !registred_date && !description) {
      return res.status(401).json({ message: "All fields are mendatory" });
    } else {
      const postedTransection = await TransectionModel.findById(id);
      // trans ka wax laga badalaa in la qabto id gisa kadibne laso aqriyo amount giisa si marki loo update garynayo amount ga dhiman ugu darsan kro
      let postedTransectionAmount = postedTransection.amount;
      if (!mongoose.Types.ObjectId.isValid(account_id)) {
        return res.status(400).json({ message: "Account not found" });
      }
      // check account balance
      const account = await Account.findById(account_id);
      let balance = account.balance;
      if (transection_type === "income") {
        const data = {
          transection_type,
          amount,
          account_id,
          registred_date,
          description,
          createdby: req.userId,
        };
        const updatedData = await TransectionModel.findByIdAndUpdate(
          id,
          { $set: data },
          { new: true }
        );
        if (updatedData) {
          // get original transaction amount to update balance
          let originalAmount = postedTransection.amount;
          let currentAmount = balance - originalAmount + amount;
          await Account.findByIdAndUpdate(account_id, {
            $set: { balance: currentAmount },
            new: true,
          });
        }
        res.status(200).json(updatedData);
      } else if (transection_type === "expense") {
        // hadi empty u yahay you don't have a income
        if (balance.length === 0) {
          res.status(404).json("You don't have a income");
        } else if (balance < amount) {
          res
            .status(404)
            .json(
              `You don't have a sufficient amount. Your balance is only $${balance}`
            );
        } else {
          const data = {
            transection_type,
            amount,
            account_id,
            registred_date,
            description,
            createdby: req.userId,
          };
          const updatedData = await TransectionModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
          );
          let originalAmount = postedTransection.amount;
          let currentAmount = balance - originalAmount + amount;
          // update account balance
          if (updatedData) {
            await Account.findByIdAndUpdate(account_id, {
              $set: { balance: currentAmount },
              new: true,
            });
          }
          res.status(200).json(updatedData);
        }
      } else {
        res.status().json("unknown error");
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getTransactionByDate = async (req, res) => {
  const { transaction_type, start_date, end_date } = req.body;
  try {
    if (transaction_type === "all") {
      const transection = await TransectionModel.find().where({
        createdby: req.userId,
        registred_date: { $gte: start_date, $lte: end_date },
      });
      return res.status(200).json(transection);
    } else if (transaction_type === "income") {
      const transection = await TransectionModel.find().where({
        transection_type: "income",
        createdby: req.userId,
        registred_date: { $gte: start_date, $lte: end_date },
      });
      return res.status(200).json(transection);
    } else if (transaction_type === "expense") {
      const transection = await TransectionModel.find().where({
        transection_type: "expense",
        createdby: req.userId,
        registred_date: { $gte: start_date, $lte: end_date },
      });
      return res.status(200).json(transection);
    } else {
      return res.status(404).json({ message: "No Transaciton Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const checkStatement = async (req, res) => {
  const { transaction_type, start_date, end_date } = req.body;
  try {
    if (transaction_type === "all") {
      const transection = await TransectionModel.find().where({
        createdby: req.userId,
        registred_date: { $gte: start_date, $lte: end_date },
      });
      return res.status(200).json(transection);
    } else if (transaction_type === "income") {
      const transection = await TransectionModel.find().where({
        transection_type: "income",
        createdby: req.userId,
        registred_date: { $gte: start_date, $lte: end_date },
      });
      return res.status(200).json(transection);
    } else if (transaction_type === "expense") {
      const transection = await TransectionModel.find().where({
        transection_type: "expense",
        createdby: req.userId,
        registred_date: { $gte: start_date, $lte: end_date },
      });
      return res.status(200).json(transection);
    } else {
      return res.status(404).json({ message: "No Statement Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// delete transection
export const deleteTransection = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Transaction ID!" });
    }
    const transection = await TransectionModel.findByIdAndRemove(id).where({
      createdby: req.userId,
    });
    if (!transection) {
      res.status(401).json({ message: "No transection found" });
    } else {
      let amount = transection.amount;
      // get account balance
      let account = await Account.findById(transection.account_id);
      let balance = account.balance;
      if (transection.transection_type === "income") {
        let newBalance = balance - amount;
        await Account.findByIdAndUpdate(transection.account_id, {
          $set: { balance: newBalance },
          new: true,
        });
        return res.status(200).json("Transaction Delete Successfully");
      } else if (transection.transection_type === "expense") {
        let newBalance = balance + amount;
        await Account.findByIdAndUpdate(transection.account_id, {
          $set: { balance: newBalance },
          new: true,
        });
        return res.status(200).json("Transaction Delete Successfully");
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
      // return res.status(400).json(transection);
    }
  } catch (error) {}
};
