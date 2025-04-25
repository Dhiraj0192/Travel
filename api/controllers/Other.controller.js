import { handleError } from "../helpers/handleError.js";
import Other from "../models/Other.model.js";

export const addOther = async (req, res, next) => {
  try {
    const { number,email,location } = req.params;
    
    
    const newDetails = new Other({ number:number ? number : "", email: email ? email : "", location: location ? location: "" });
    const savedDetails = await newDetails.save();
    res.status(201).json(savedDetails);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getOtherDetails = async (req, res, next) => {
  try {
    const details = await Other.findOne();
    res.status(200).json(details);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateOtherDetails = async (req, res, next) => {
  try {
    const { number,email,location } = req.params;
    const updatedDetails = await Other.findOneAndUpdate(
      {},
      { number:number ? number : "", email: email ? email : "", location: location ? location: ""  },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedDetails);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// export const updateSocialLink = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { title, link } = req.body;
//     const updatedSocialLink = await SocialLink.findByIdAndUpdate(
//       id,
//       { title, link },
//       { new: true }
//     );
//     if (!updatedSocialLink) {
//       return next(handleError(404, "Social link not found"));
//     }
//     res.status(200).json(updatedSocialLink);
//   } catch (error) {
//     next(handleError(500, error.message));
//   }
// };

// export const deleteSocialLink = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deletedSocialLink = await SocialLink.findByIdAndDelete(id);
//     if (!deletedSocialLink) {
//       return next(handleError(404, "Social link not found"));
//     }
//     res.status(200).json({ message: "Social link deleted successfully" });
//   } catch (error) {
//     next(handleError(500, error.message));
//   }
// };
