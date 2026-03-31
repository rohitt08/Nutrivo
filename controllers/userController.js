const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getRequestUserId = (req) => req.user?.id || req.body?.id || req.body?.userId || req.query?.id;

// GET USER
const getUserController = async (req, res) => {
  try {
    const userId = getRequestUserId(req);
    if (!userId) {
      return res.status(400).send({ success: false, message: "User id required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    user.password = undefined;
    res.status(200).send({ success: true, message: "User fetched", user });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching user", error: error.message });
  }
};

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    const userId = getRequestUserId(req);
    if (!userId) {
      return res.status(400).send({ success: false, message: "User id required" });
    }

    const updateData = {};
    if (req.body.userName) {
      updateData.userName = req.body.userName;
      updateData.name = req.body.userName;
    }
    if (req.body.profile) {
      updateData.profile = req.body.profile;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).send({ success: false, message: "No profile fields provided" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    res.status(200).send({ success: true, message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error updating user", error: error.message });
  }
};

// UPDATE PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    const userId = getRequestUserId(req);
    if (!userId) {
      return res.status(400).send({ success: false, message: "User id required" });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({ success: false, message: "Old and new password required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ success: false, message: "Invalid old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({ success: true, message: "Password updated" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error updating password", error: error.message });
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).send({ success: false, message: "Email and password required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error resetting password", error: error.message });
  }
};

// DELETE USER
const deleteProfileController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    res.status(200).send({ success: true, message: "Account deleted" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error deleting account", error: error.message });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
