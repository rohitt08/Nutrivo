const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("User", userSchema);
