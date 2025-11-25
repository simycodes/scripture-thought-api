import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({ users });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  console.log(user);
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  // remove password so it can't be updated on this route
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj, { new: true});
  // const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);
  res.status(StatusCodes.OK).json({ msg: "user updated", updatedUser });
};

// DELETE A USER
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const removedUser = await User.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
};