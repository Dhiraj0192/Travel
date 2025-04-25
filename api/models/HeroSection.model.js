import mongoose from "mongoose";

const heroSectionSchema = new mongoose.Schema(
  {
    featuredImage: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const HeroSection = mongoose.model("HeroSection", heroSectionSchema, "herosections");
export default HeroSection;
