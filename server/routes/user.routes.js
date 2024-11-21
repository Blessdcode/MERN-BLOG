import { Router } from "express";

import {
  registerUserController,
  loginUserController,
  logOut,
  getUserProfile,
  updateUserProfile,
  deleteUserController,
} from "../controller/user.controller.js";

import { protect } from "../middleware/auth.mddleware.js";

const useRouter = Router();

useRouter.post("/register", registerUserController);
useRouter.post("/login", loginUserController);
useRouter.post("/logout", logOut);
useRouter.get("/getProfile", protect, getUserProfile);
useRouter.put("/updatedUser", protect, updateUserProfile);
useRouter.delete("/deleteUser", protect, deleteUserController);

export default useRouter;
