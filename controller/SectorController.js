const Sector = require("../models/Sector");
const { uploadToCloudinary } = require("../helpers/CloudinaryHelper");

exports.createSector = async (req, res) => {
  try {
    const { name, description, backgroundImage, pdf } = req.body;
    
    let backgroundImageUrl = backgroundImage;
    let pdfUrl = pdf;

    // Handle file uploads if files are sent directly
    if (req.files?.backgroundImage) {
      const result = await uploadToCloudinary(req.files.backgroundImage.tempFilePath, "sectors");
      backgroundImageUrl = result.secure_url;
    }

    if (req.files?.pdf) {
      const result = await uploadToCloudinary(req.files.pdf.tempFilePath, "sectors");
      pdfUrl = result.secure_url;
    }

    
    const sector = await Sector.create({ 
      name, 
      description, 
      backgroundImage: backgroundImageUrl, 
      pdf: pdfUrl 
    });

    res.status(201).json(sector);
  } catch (error) {
    console.error("Error creating sector:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllSectors = async (req, res) => {
    try {
      const sectors = await Sector.find().populate("subsectors"); 
      res.status(200).json(sectors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  exports.getSectorById = async (req, res) => {
    try {
      const { id } = req.params;
      const sector = await Sector.findById(id).populate("subsectors");
  
      if (!sector) {
        return res.status(404).json({ error: "Sector not found" });
      }
  
      res.status(200).json(sector);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  exports.updateSector = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, backgroundImage, pdf } = req.body;
      const updatedFields = {};
  
      if (name) updatedFields.name = name;
      if (description) updatedFields.description = description;
      
      if (req.files?.backgroundImage) {
        const result = await uploadToCloudinary(req.files.backgroundImage.tempFilePath, "sectors");
        updatedFields.backgroundImage = result.secure_url;
      } else if (backgroundImage) {
        updatedFields.backgroundImage = backgroundImage;
      }
  
      if (req.files?.pdf) {
        const result = await uploadToCloudinary(req.files.pdf.tempFilePath, "sectors");
        updatedFields.pdf = result.secure_url;
      } else if (pdf) {
        updatedFields.pdf = pdf;
      }
  
      const updatedSector = await Sector.findByIdAndUpdate(id, updatedFields, { new: true });
  
      if (!updatedSector) {
        return res.status(404).json({ error: "Sector not found" });
      }
  
      res.status(200).json(updatedSector);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  exports.deleteSector = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedSector = await Sector.findByIdAndDelete(id);
  
      if (!deletedSector) {
        return res.status(404).json({ error: "Sector not found" });
      }
  
      res.status(200).json({ message: "Sector deleted successfully", sector: deletedSector });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  