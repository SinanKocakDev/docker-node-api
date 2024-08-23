import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  // Creating a new signature
  const secret_key = 'dsfksoker'
  return jwt.sign({ _id }, secret_key, { expiresIn: "10d" });
};

export const registerUser = async (req, res) => {
  // Grab data from request body
  const { email, password } = req.body;

  // Check the fields are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check if email already exist
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ error: "Email is already taken" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);

  try {
    // Register the user
    const user = await User.create({ email, password: hashed });
    // Create the JsonWebToken
    const token = createToken(user._id);
    // Send the response
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: "desc" });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
