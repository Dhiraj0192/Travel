import { handleError } from "../helpers/handleError.js";
import cloudinary from "../config/cloudinary.js";
export const uploadImageCk = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(handleError(500, error.message));
  }
};
