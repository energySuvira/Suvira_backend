const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = async (filePath, folder, fileName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
      flags: `attachment:${fileName || 'download'}`,
      use_filename: true
    });
    
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Failed:", error.message);
    throw new Error(error.message || "Cloudinary Upload Failed");
  }
};

module.exports = { uploadToCloudinary };
