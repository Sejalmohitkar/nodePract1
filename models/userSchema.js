import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const UserRegister = mongoose.models.UserRegister || mongoose.model("UserRegister", UserSchema);

export default UserRegister;
