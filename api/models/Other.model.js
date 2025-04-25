import mongoose from "mongoose";

const otherSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      unique:true,
      trim: true,
    },
    email: {
      type: String,
      unique:true,
      trim: true,
    },
    location: {
      type: String,
      unique:true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Other = mongoose.model("Other", otherSchema, "others");
export default Other;
