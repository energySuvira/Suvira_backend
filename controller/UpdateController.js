const BlogSchema = require("../models/Blogs");
const ClientName = require("../models/Clients");
const FeedbackSchema = require("../models/Feedbacks");
const JobPosting = require("../models/JobPosting");
const ProductSchema = require("../models/Products");
const ServiceSchema = require("../models/Services");
const AuthSchema = require("../models/Auth");
const bcrypt = require("bcryptjs");
const Logo = require("../models/Logo");
const OtpSchema = require("../models/Otp");
const NewsSchema = require("../models/News");

const updateBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogId = req.params.id;
    const {
      author,
      sector,
      source,
      title,
      content,
      authorImg,
      blogImg,
      views = 1,
      likes = 1,
    } = req.body;
    if (
      !author ||
      !sector ||
      !source ||
      !title ||
      !content ||
      !authorImg ||
      !blogImg ||
      !views ||
      !likes
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

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

    const Blog = await BlogSchema.findById(blogId);
    if (!Blog) {
      return res.status(403).json({
        message: "Blog Not Found Invalid Blog Id.",
      });
    }

    await BlogSchema.findByIdAndUpdate(blogId, {
      author,
      sector,
      source,
      title,
      content,
      authorImg,
      blogImg,
      views,
      likes,
    });

    return res.status(200).json({
      success: true,
      message: "Blogs Updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const userId = req.user._id;
    const newsId = req.params.id;
    const { publishedBy, sector, source, date, headline, news, newsImg } =
      req.body;
    if (
      !publishedBy ||
      !sector ||
      !source ||
      !date ||
      !headline ||
      !news ||
      !newsImg
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

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

    const Blog = await NewsSchema.findById(newsId);
    if (!Blog) {
      return res.status(403).json({
        message: "News Not Found Invalid News Id.",
      });
    }

    await NewsSchema.findByIdAndUpdate(newsId, {
      publishedBy,
      sector,
      source,
      date,
      headline,
      news,
      newsImg,
    });

    return res.status(200).json({
      success: true,
      message: "News Updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const userId = req.user._id;
    const clientId = req.params.id;
    const { name, img } = req.body;
    if (!name || !img) {
      return res.status(400).json({ message: "All fields are required." });
    }

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

    const client = await ClientName.findById(clientId);
    if (!client) {
      return res.status(403).json({
        message: "Client Name Not Found Invalid Client Id.",
      });
    }

    await ClientName.findByIdAndUpdate(clientId, {
      name,
      img,
    });

    return res.status(200).json({
      success: true,
      message: "Client Updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
    const FeedbackId = req.params.id;
    const { author, feedback, rating, img } = req.body;
    if (!author || !feedback || !rating || !img) {
      return res.status(400).json({ message: "All fields are required." });
    }

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

    const Feedback = await FeedbackSchema.findById(FeedbackId);
    if (!Feedback) {
      return res.status(403).json({
        message: "Feedback Not Found Invalid Feedback Id.",
      });
    }

    await FeedbackSchema.findByIdAndUpdate(FeedbackId, {
      author,
      feedback,
      rating,
      img,
    });

    return res.status(200).json({
      success: true,
      message: "Feedback Updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const updateJobPosting = async (req, res) => {
  try {
    const userId = req.user._id;
    const JobId = req.params.id;
    const { title, role, location, date, detail } = req.body;
    if (!title || !role || !location || !date || !detail) {
      return res.status(400).json({ message: "All fields are required." });
    }

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

    const Job = await JobPosting.findById(JobId);
    if (!Job) {
      return res.status(403).json({
        message: "Job Posting Not Found Invalid Job Id.",
      });
    }

    await JobPosting.findByIdAndUpdate(JobId, {
      title,
      role,
      location,
      date,
      detail,
    });

    return res.status(200).json({
      success: true,
      message: "Job Updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const ProductId = req.params.id;
    const { name, desc, sector, appearance, grade, applications, image } =
      req.body;
    if (
      !name | !desc ||
      !sector | !appearance | !grade ||
      !applications ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

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

    const Product = await ProductSchema.findById(ProductId);
    if (!Product) {
      return res.status(403).json({
        message: "Product Not Found Invalid Product Id.",
      });
    }

    await ProductSchema.findByIdAndUpdate(ProductId, {
      name,
      desc,
      sector,
      appearance,
      grade,
      applications,
      image,
    });

    return res.status(200).json({
      success: true,
      message: "Product Updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const userId = req.user._id;
    const serviceId = req.params.id;
    const { logo, title, desc } = req.body;
    if (!logo || !title || !desc) {
      return res.status(400).json({ message: "All fields are required." });
    }

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

    const Service = await ServiceSchema.findById(serviceId);
    if (!Service) {
      return res.status(403).json({
        message: "Service Not Found Invalid Service Id.",
      });
    }

    await ServiceSchema.findByIdAndUpdate(serviceId, {
      logo,
      title,
      desc,
    });

    return res.status(200).json({
      success: true,
      message: "Service Updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const UpdateInnerService = async (req, res) => {
  try {
    const userId = req.user._id;
    const innerServiceId = req.params.id;
    const {
      serviceName,
      name,
      sector,
      section,
      image,
      formulae,
      PhysicalAppearance,
      Grade,
      Desc,
      Specification,
      SafetyInformation,
      Support,
    } = req.body;

    if (
      !serviceName ||
      !name ||
      !sector ||
      !section ||
      !image ||
      !formulae ||
      !PhysicalAppearance ||
      !Grade ||
      !Desc ||
      !Specification ||
      !SafetyInformation ||
      !Support
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

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
      return res.status(404).json({ message: "Invalid Service Not Exist." });
    }

    const innerService = service.InnerServices.id(innerServiceId);
    if (!innerService) {
      return res.status(404).json({ message: "Inner service not found." });
    }

    innerService.name = name;
    innerService.sector = sector;
    innerService.section = section;
    innerService.image = image;
    innerService.formulae = formulae;
    innerService.PhysicalAppearance = PhysicalAppearance;
    innerService.Grade = Grade;
    innerService.Desc = Desc;
    innerService.Specification = Specification;
    innerService.SafetyInformation = SafetyInformation;
    innerService.Support = Support;

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Inner service updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const UpdateCarrerBanner = async (req, res) => {
  try {
    const userId = req.user._id;
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "All fields are required." });
    }

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

    const service = await Logo.findOneAndUpdate(
      {},
      { carrerBanner: image },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: "Invalid Service Not Exist." });
    }

    return res.status(200).json({
      success: true,
      message: "Career banner updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const Forget_Password = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await AuthSchema.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }

    const otpFound = await OtpSchema.findOne({ email });
    if (!otpFound) {
      return res.status(404).json({ message: "Otp is expired or invalid." });
    }

    if (otpFound.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    await OtpSchema.findOneAndDelete({ email });

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await AuthSchema.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User does not exist." });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

module.exports = {
  updateBlog,
  updateNews,
  UpdateCarrerBanner,
  Forget_Password,
  updateClient,
  updateFeedback,
  updateJobPosting,
  updateProduct,
  updateService,
  UpdateInnerService,
};
