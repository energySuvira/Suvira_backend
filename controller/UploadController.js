const path = require("path");
const fs = require("fs");
const AuthSchema = require("../models/Auth");
const cloudinary = require("cloudinary").v2;
const { userInfo } = require("os");

const uploadImageController = async (req, res) => {
  try {
    const file = req.files.image;

    // Check if file exists
    if (!file) {
      console.log("No image file uploaded.");
      return res.status(400).json({
        message: "Image is Required",
      });
    }

    console.log("Incoming image details:", {
      name: file.name,
      size: file.size,
      mimetype: file.mimetype,
      tempFilePath: file.tempFilePath,
    });

    // Check file size (2 MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      console.log("Image size exceeds 2 MB:", file.size);
      return res.status(400).json({
        message: "Image size exceeds 2 MB",
      });
    }

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
      "image/svg+xml",
      "image/tiff",
      "image/vnd.microsoft.icon",
      "image/x-icon",
      "image/vnd.wap.wbmp",
      "image/apng",
      "image/avif",
    ];

    // Check file type
    if (!allowedImageTypes.includes(file.mimetype)) {
      console.log("Invalid image type:", file.mimetype);
      return res.status(400).json({
        message:
          "Only JPEG, PNG, GIF, BMP, WEBP, TIFF, ICON, X-ICON, WBMP, APNG, AVIF, and SVG images are allowed",
      });
    }

    // Create a temporary path to save the file
    const tempFilePath = path.join(__dirname, "../uploads", file.name);
   
    await file.mv(tempFilePath);

    
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "user-images",
      public_id: `user-${Date.now()}`,
      overwrite: true,
      resource_type: "image",
    });

   
    fs.unlinkSync(tempFilePath);

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      fileUrl: result.secure_url,
    });
  } catch (err) {
    console.error("Error during image upload:", err);
    return res.status(500).json({
      error: err.message,
      message: "Something went wrong",
    });
  }
};


const uploadFileController = async (req, res) => {
  try {
    const file = req.files.file;

    if (!file) {
      return res.status(400).json({
        message: "File is Required",
      });
    }

    // Check file size (2 MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      return res.status(400).json({
        message: "File size exceeds 2 MB",
      });
    }

    // Check file type (mimetype)
    if (!file.mimetype.startsWith("application/pdf")) {
      return res.status(400).json({
        message: "Only PDF files are allowed",
      });
    }

   
    const tempFilePath = path.join(__dirname, "../uploads", file.name);
    await file.mv(tempFilePath);
    
    // Upload pdf to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "user-files",
      public_id: `user-${Date.now()}`,
      overwrite: true,
      resource_type: "raw",
    });
    

    // Delete uploaded pdf from local storage
    fs.unlinkSync(tempFilePath);

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl: result.secure_url,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Something Went Wrong",
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user._id;

    const userInfo = await AuthSchema.findById(userId).select("-password");
    if (userInfo) {
      return res.status(200).json({
        success: true,
        message: "User Info Retrieved Successfully",
        userInfo: userInfo,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Something Went Wrong",
    });
  }
};

module.exports = {
  getUserInfo,
  uploadFileController,
  uploadImageController,
};
