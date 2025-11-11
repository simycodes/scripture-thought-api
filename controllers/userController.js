import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";


// GET ALL USERS
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({ users });
};

export const getCurrentUser = async (req, res) => {
  
};
