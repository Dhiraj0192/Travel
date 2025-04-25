import express from "express";
import { subscribeEmail, checkSubscription } from "../controllers/Email.controller.js";

const router = express.Router();

router.post("/subscribe", subscribeEmail);
router.post("/check-subscription", checkSubscription);

export default router;
