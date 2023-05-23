import mongoose, { Schema } from "mongoose";
const AccountSchema = mongoose.Schema({
  account_no: { type: String },
  account_name: { type: String },
  bank_name: { type: String },
  balance: { type: Number, default: 0 },
  description: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  created_date: { type: String },
});
const Account = mongoose.model("Account", AccountSchema);
export default Account;
