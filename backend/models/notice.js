import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "blue-bg",
    },
  },
  { timestamps: true },
);

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
