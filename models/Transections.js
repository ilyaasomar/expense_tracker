import mongoose, { Schema } from "mongoose";
const TransectionSchema = mongoose.Schema({
  transection_type: { type: String },
  action_id: { type: Schema.Types.ObjectId, ref: "General" },
  amount: { type: Number },
  account_id: { type: Schema.Types.ObjectId, ref: "Account" },
  description: { type: String },
  registred_date: { type: String },
  createdby: { type: Schema.Types.ObjectId, ref: "User" },
});
const Transection = mongoose.model("Transection", TransectionSchema);
export default Transection;
