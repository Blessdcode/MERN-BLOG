import UserModel from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const registerUserController = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Account already exists");
  }

  const user = await UserModel.create({
    name,
    email,
    mobile,
    password,
  });
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const logOut = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserController = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);


  if (user) {
     await user.deleteOne();
    res.status(200).json({
      message: `User with ID ${_id} deleted successfully.`,
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUserController,
  loginUserController,
  logOut,
  getUserProfile,
  updateUserProfile,
  deleteUserController,
};
