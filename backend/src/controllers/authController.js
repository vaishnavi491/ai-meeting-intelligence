import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   GENERATE TOKEN
========================= */

const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

/* =========================
   REGISTER USER
========================= */

export const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    // Check existing user
    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    // Hash password
    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    // Create user
    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    return res.status(201).json({
      success: true,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },

      token:
        generateToken(user._id),
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Registration failed",
    });
  }
};

/* =========================
   LOGIN USER
========================= */

export const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // Find user
    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    // Compare password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    // Success
    return res.status(200).json({
      success: true,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },

      token:
        generateToken(user._id),
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Login failed",
    });
  }
};