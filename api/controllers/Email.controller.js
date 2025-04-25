import Email from "../models/Email.model.js";
import { handleError } from "../helpers/handleError.js";
import nodemailer from "nodemailer";

export const subscribeEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already subscribed." });
    }

    // Save email to the database
    const newEmail = new Email({ email });
    await newEmail.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yadavdhiru201@gmail.com",
        pass: "euli iqei mbfd zvha",
      },
    });

    const mailOptions = {
      from: "yadavdhiru201@gmail.com",
      to: email,
      subject: "Subscription Confirmation",
      text: "Thank you for subscribing to our website!",
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Subscription successful and email sent." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const checkSubscription = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if email exists in the database
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(200).json({ isSubscribed: true });
    }

    res.status(200).json({ isSubscribed: false });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
