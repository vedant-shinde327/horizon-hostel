import mongoose, { trusted } from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  roomNo: {
    type: String,
    default: "Not Assigned"
  },
  hostelBlock: {
    type: String,
    default: "A Block"
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Active"
  }
});

const User = mongoose.model("User", userSchema);
export default User;