const Subsector = require("../models/Subsector");
const Sector = require("../models/Sector");
const { uploadToCloudinary } = require("../helpers/CloudinaryHelper");

exports.createSubsector = async (req, res) => {
  try {
    const { name, description, sectorId,logo,pdf } = req.body;

    let logoUrl = logo;
    let pdfUrl = pdf;

    if (req.files?.logo) {
      const result = await uploadToCloudinary(req.files.logo.tempFilePath, "subsectors");
      logoUrl = result.secure_url;
    }
    if (req.files?.pdf) {
      const result = await uploadToCloudinary(req.files.pdf.tempFilePath, "subsectors")
      pdfUrl = result.secure_url;
    }
   

    const subsector = await Subsector.create({ 
      name, 
      description, 
      logo:logoUrl, 
      pdf:pdfUrl
    });

    const sector = await Sector.findById(sectorId);
    sector.subsectors.push(subsector._id);
    await sector.save();

    res.status(201).json(subsector);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSubsectors = async (req, res) => {
    try {
      const subsectors = await Subsector.find().populate("categories"); // Populates categories if referenced
      res.status(200).json(subsectors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  

  exports.getSubsectorById = async (req, res) => {
    try {
      const { id } = req.params;
      const subsector = await Subsector.findById(id).populate("categories");
  
      if (!subsector) {
        return res.status(404).json({ error: "Subsector not found" });
      }
  
      res.status(200).json(subsector);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateSubsector = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, logo, pdf } = req.body;
  
      // Find existing subsector first
      const existingSubsector = await Subsector.findById(id);
      if (!existingSubsector) {
        return res.status(404).json({ message: "Subsector not found" });
      }
  
      // Prepare update object
      const updateData = {
        name: name || existingSubsector.name,
        description: description || existingSubsector.description,
        logo: logo || existingSubsector.logo,
        pdf: pdf || existingSubsector.pdf
      };
  
      // Handle file uploads if present
      if (req.files?.logo) {
        const result = await uploadToCloudinary(req.files.logo.tempFilePath, "subsectors");
        updateData.logo = result.secure_url;
      }
  
      if (req.files?.pdf) {
        const result = await uploadToCloudinary(req.files.pdf.tempFilePath, "subsectors");
        updateData.pdf = result.secure_url;
      }
  
      // Update the subsector
      const updatedSubsector = await Subsector.findByIdAndUpdate(
        id, 
        updateData,
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        data: updatedSubsector,
        message: "Subsector updated successfully"
      });
  
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    }
  };

  exports.deleteSubsector = async (req, res) => {
    try {
      const { id } = req.params;
  
      const subsector = await Subsector.findByIdAndDelete(id);
  
      if (!subsector) {
        return res.status(404).json({ error: "Subsector not found" });
      }
  
      // Remove subsector reference from its parent sector
      await Sector.updateOne({ subsectors: id }, { $pull: { subsectors: id } });
  
      res.status(200).json({ message: "Subsector deleted successfully", subsector });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
