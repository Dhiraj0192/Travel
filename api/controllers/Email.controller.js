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
      from: "Traveler's Mirror",
      to: email,
      subject: "Subscription Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            
            <h1 style="color: #333; margin-top: 20px;">Welcome to Traveler's Mirror</h1>
            <p style="color: #555; margin-top: 10px; font-size: 16px; line-height: 1.6;">
              Thank you for subscribing to Traveler's Mirror! We are your ultimate companion for exploring the world. From travel tips to destination guides, we bring you the best insights to make your journeys unforgettable.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Stay connected with us to discover hidden gems, exclusive deals, and inspiring stories from fellow travelers. Your adventure begins here!
            </p>
            <div style="margin-top: 25px;">
              <a href="https://www.travelersmirror.com" style="display: inline-block; padding: 12px 25px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
            </div>
            <p style="color: #aaa; font-size: 12px; margin-top: 20px;">
              If you did not subscribe to Traveler's Mirror, please ignore this email.
            </p>
          </div>
        </div>
      `,
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
