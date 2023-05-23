import mongoose from "mongoose";
var url = "https://i.stack.imgur.com/34AD2.jpg";
const userSchema = mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  profilePic: { type: String, default: url },
  isAdmin: { type: Boolean, default: false },
});
const User = mongoose.model("User", userSchema);
export default User;
