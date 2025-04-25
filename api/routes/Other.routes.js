import express from "express";
import {
  addOther,
  getOtherDetails,
  updateOtherDetails
} from "../controllers/Other.controller.js";

const OtherRouter = express.Router();

OtherRouter.post("/add/:number/:email/:location", addOther);
OtherRouter.get("/details", getOtherDetails);
OtherRouter.post("/update/:number/:email/:location", updateOtherDetails);
// router.put("/update/:id", updateSocialLink);
// router.delete("/delete/:id", deleteSocialLink);

export default OtherRouter;
