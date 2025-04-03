const BlogSchema = require("../models/Blogs");
const ClientName = require("../models/Clients");
const FeedbackSchema = require("../models/Feedbacks");
const JobPosting = require("../models/JobPosting");
const ProductSchema = require("../models/Products");
const ServiceSchema = require("../models/Services");
const AuthSchema = require("../models/Auth");
const NewsSchema = require("../models/News");

const deleteBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogId = req.params.id;

    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    const blogExist = await BlogSchema.findById(blogId);
    if (!blogExist) {
      return res.status(404).json({ message: "Blog does not exist." });
    }

    await BlogSchema.findByIdAndDelete(blogId);

    return res.status(200).json({
      success: true,
      message: "Blogs Deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const userId = req.user._id;
    const newsId = req.params.id;

    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    const blogExist = await NewsSchema.findById(newsId);
    if (!blogExist) {
      return res.status(404).json({ message: "News does not exist." });
    }

    await NewsSchema.findByIdAndDelete(newsId);

    return res.status(200).json({
      success: true,
      message: "News Deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const userId = req.user._id;
    const clientId = req.params.id;

    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    const clientExist = await ClientName.findById(clientId);
    if (!clientExist) {
      return res.status(404).json({ message: "Client does not exist." });
    }

    await ClientName.findByIdAndDelete(clientId);

    return res.status(200).json({
      success: true,
      message: "Client Deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
    const FeedbackId = req.params.id;

    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    const feedbackExist = await FeedbackSchema.findById(FeedbackId);
    if (!feedbackExist) {
      return res.status(404).json({ message: "Feedback does not exist." });
    }

    await FeedbackSchema.findByIdAndDelete(FeedbackId);

    return res.status(200).json({
      success: true,
      message: "Feedback Deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const deleteJobPosting = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;

    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    const jobPostingExit = await JobPosting.findById(jobId);
    if (!jobPostingExit) {
      return res.status(404).json({ message: "Job Posting does not exist." });
    }

    await JobPosting.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: "Job Posting Deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const ProductId = req.params.id;

    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    const productExist = await ProductSchema.findById(ProductId);
    if (!productExist) {
      return res.status(404).json({ message: "Product does not exist." });
    }

    await ProductSchema.findByIdAndDelete(ProductId);

    return res.status(200).json({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const userId = req.user._id;
    const serviceID = req.params.id;

    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    const serviceExist = await ServiceSchema.findById(serviceID);
    if (!serviceExist) {
      return res.status(404).json({ message: "Service does not exist." });
    }

    await ServiceSchema.findByIdAndDelete(serviceID);

    return res.status(200).json({
      success: true,
      message: "Service Deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const deleteInnerService = async (req, res) => {
  try {
    const userId = req.user._id;
    const serviceName = req.params.name;
    const innerServiceId = req.params.id;

    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    const service = await ServiceSchema.findOne({ title: serviceName });
    if (!service) {
      return res.status(404).json({ message: "Service does not exist." });
    }

    const innerService = service.InnerServices.id(innerServiceId);
    if (!innerService) {
      return res.status(404).json({ message: "Inner service not found." });
    }

    service.InnerServices.pull(innerServiceId);

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Inner service deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const deleteSection = async (req, res) => {
  try {
    const userId = req.user._id;
    const serviceName = req.params.name;
    const innerServiceId = req.params.id;

    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    const service = await ServiceSchema.findOne({ title: serviceName });
    if (!service) {
      return res.status(404).json({ message: "Service does not exist." });
    }

    const innerService = service.section.id(innerServiceId);
    if (!innerService) {
      return res.status(404).json({ message: "service Section not found." });
    }

    service.section.pull(innerServiceId);

    await service.save();

    return res.status(200).json({
      success: true,
      message: "service section deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

module.exports = {
  deleteSection,
  deleteBlog,
  deleteNews,
  deleteClient,
  deleteFeedback,
  deleteJobPosting,
  deleteProduct,
  deleteService,
  deleteInnerService,
};
