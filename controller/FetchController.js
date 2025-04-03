const BlogSchema = require("../models/Blogs");
const ClientName = require("../models/Clients");
const FeedbackSchema = require("../models/Feedbacks");
const JobPosting = require("../models/JobPosting");
const ProductSchema = require("../models/Products");
const ServiceSchema = require("../models/Services");
const JobApplicationSchema = require("../models/jobApplications");
const Logo = require("../models/Logo");
const AuthSchema = require("../models/Auth");
const NewsSchema = require("../models/News");

const fetchJobApplications = async (req, res) => {
  try {
    const userId = req.user._id;
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
    const jobApplications = await JobApplicationSchema.find();
    return res.status(200).json({
      success: true,
      message: "Job applications fetched successfully",
      jobApplications,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const fetchLogo = async (req, res) => {
  try {
    const logos = await Logo.find();
    return res.status(200).json({
      success: true,
      message: "Logo fetched successfully",
      logos,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const fetchAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogSchema.find();
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const fetchAllNews = async (req, res) => {
  try {
    const news = await NewsSchema.find();
    return res.status(200).json({
      success: true,
      message: "News fetched successfully",
      news,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await ClientName.find();
    return res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      clients,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackSchema.find();
    return res.status(200).json({
      success: true,
      message: "Feedbacks fetched successfully",
      feedbacks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const getJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    return res.status(200).json({
      success: true,
      message: "Job postings fetched successfully",
      jobPostings,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await ServiceSchema.find();
    return res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      services,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

module.exports = {
  fetchAllBlogs,
  fetchAllNews,
  getClients,
  getFeedbacks,
  getJobPostings,
  getProducts,
  getServices,
  fetchJobApplications,
  fetchLogo,
};
