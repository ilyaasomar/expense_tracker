import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = "test";
export const signup = async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      res.status(401).json({ message: "User already exists" });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const usersData = await UserModel.create({
        name,
        phone,
        email,
        password: hashPassword,
        name,
      });
      const token = jwt.sign(
        {
          email: usersData.email,
          id: usersData._id,
        },
        secret,
        { expiresIn: "3h" }
      );

      // res.status(202).json({ usersData, token });
      res.status(202).json(name);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "All Mendatory fields are required" });
    }
    const oldUser = await UserModel.findOne({ email });
    // you can also write like this
    // WAY 1
    // if(user &&(await bcrypt.compare(password, oldUser.password)))
    // WAY 2
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, password } = req.body;
  try {
    const data = {
      name,
      phone,
      email,
      password,
    };
    const updatedData = await UserModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
