const Category = require("../models/Category");
const Subsector = require("../models/Subsector");
const { uploadToCloudinary } = require("../helpers/CloudinaryHelper");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, subsectorId, customFields, logo, pdf } = req.body;

    // Validate required fields
    if (!name || !description || !subsectorId) {
      return res.status(400).json({ 
        error: "Name, description, and subsectorId are required" 
      });
    }

    // Validate subsector exists
    const subsector = await Subsector.findById(subsectorId);
    if (!subsector) {
      return res.status(404).json({ 
        error: "Subsector not found" 
      });
    }

    let logoUrl = logo;
    let pdfUrl = pdf;

    // Handle file uploads if present in request
    if (req.files) {
      if (req.files.logo) {
        const result = await uploadToCloudinary(
          req.files.logo.tempFilePath, 
          "categories"
        );
        logoUrl = result.secure_url;
      }

      if (req.files.pdf) {
        const result = await uploadToCloudinary(
          req.files.pdf.tempFilePath, 
          "categories"
        );
        pdfUrl = result.secure_url;
      }
    }

    // Process custom fields
    let processedCustomFields = [];
    if (customFields) {
      // Handle if customFields is a string
      if (typeof customFields === 'string') {
        processedCustomFields = JSON.parse(customFields);
      } else {
        processedCustomFields = customFields;
      }

      // Validate custom fields structure
      processedCustomFields = processedCustomFields.map(field => ({
        fieldName: field.fieldName,
        fieldType: field.fieldType,
        fieldValue: field.fieldValue
      }));
    }

    // Create category
    const category = await Category.create({
      name,
      description,
      logo: logoUrl,
      pdf: pdfUrl,
      customFields: processedCustomFields,
    });

    // Update subsector with new category
    subsector.categories.push(category._id);
    await subsector.save();

    res.status(201).json(category);
  } catch (error) {
    console.error('Category creation error:', error);
    res.status(500).json({ 
      error: error.message || "Failed to create category" 
    });
  }
};


exports.getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find().populate("customFields"); // Populate customFields if required
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  exports.getCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  exports.updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, customFields, logo, pdf } = req.body;
  
      // Initialize updatedFields object
      const updatedFields = {
        ...(name && { name }),
        ...(description && { description }),
        ...(logo && { logo }),
        ...(pdf && { pdf })
      };
  
      // Handle customFields - no need to parse if already an array
      if (customFields) {
        updatedFields.customFields = Array.isArray(customFields) 
          ? customFields 
          : JSON.parse(customFields);
      }
  
      // Handle file uploads if present in req.files
      if (req.files?.logo) {
        updatedFields.logo = await uploadToCloudinary(
          req.files.logo.tempFilePath, 
          "categories"
        );
      }
  
      if (req.files?.pdf) {
        updatedFields.pdf = await uploadToCloudinary(
          req.files.pdf.tempFilePath, 
          "categories"
        );
      }
  
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        updatedFields,
        { 
          new: true,
          runValidators: true 
        }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ 
          success: false,
          message: "Category not found" 
        });
      }
  
      res.status(200).json({
        success: true,
        data: updatedCategory
      });
    } catch (error) {
      console.error('Update Category Error:', error);
      res.status(500).json({ 
        success: false,
        message: "Failed to update category",
        error: error.message 
      });
    }
  }

  
  exports.deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const category = await Category.findByIdAndDelete(id);
  
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      // Remove category reference from its parent subsector
      await Subsector.updateOne({ categories: id }, { $pull: { categories: id } });
  
      res.status(200).json({ message: "Category deleted successfully", category });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
