import mongoose, { Schema } from "mongoose";
const GeneralSchema = mongoose.Schema({
  action_name: { type: String },
  general_type: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  created_date: { type: String },
});
const General = mongoose.model("General", GeneralSchema);
export default General;
