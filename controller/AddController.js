const BlogSchema = require("../models/Blogs");
const ClientName = require("../models/Clients");
const FeedbackSchema = require("../models/Feedbacks");
const JobPosting = require("../models/JobPosting");
const ProductSchema = require("../models/Products");
const ServiceSchema = require("../models/Services");
const JobApplicationSchema = require("../models/jobApplications");
const ContactSchema = require("../models/Contact");
const AuthSchema = require("../models/Auth");
const nodeMailer = require("nodemailer");
const Logo = require("../models/Logo");
const OtpSchema = require("../models/Otp");
const NewsSchema = require("../models/News");

const createJobApplication = async (req, res) => {
  try {
    const {
      jobId,
      fullName,
     
      contactNumber,
      email,
     
      address,
      
      education,
      experience,
      
      resume,
    } = req.body;
    if (
      !jobId ||
      !fullName ||
      
      !contactNumber ||
      !email ||
      
      
      !address ||
     
      !education ||
      !experience ||
     
      !resume
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const data = await Logo.findOne();
    const contactEmail = data.email;
    const jobExist = await JobPosting.findById(jobId);
    if (!jobExist) {
      return res
        .status(400)
        .json({ message: "Sorry, the job does not exist." });
    }

    const existingApplication = await JobApplicationSchema.findOne({
      jobId,
      $or: [{ email }, { contactNumber }],
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Job Application - Suvira Energy" <no-reply@suvira.com>',
      to: contactEmail,
      subject: "New Job Application",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #444;
                margin: 0;
                padding: 0;
                background-color: #f7f7f7;
              }
              .container {
                max-width: 700px;
                margin: 30px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              }
              .header {
                font-size: 28px;
                font-weight: 700;
                text-align: center;
                color: #ffffff;
                background-color: #00796b;
                padding: 20px;
                border-radius: 8px 8px 0 0;
              }
              .content {
                padding: 30px;
                font-size: 16px;
              }
              .field-label {
                font-weight: 700;
                color: #00796b;
              }
              .field-value {
                margin-bottom: 15px;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
              }
              .field-value:last-child {
                border-bottom: none;
              }
              .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #777;
                background-color: #f1f1f1;
                border-radius: 0 0 8px 8px;
              }
              .footer a {
                color: #00796b;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">New Job Application</div>
              <div class="content">
                <div class="field-value"><span class="field-label">Job ID:</span> ${jobId}</div>
                <div class="field-value"><span class="field-label">First Name:</span> ${fullName}</div>
                <
                <div class="field-value"><span class="field-label">Contact Number:</span> ${contactNumber}</div>
                <div class="field-value"><span class="field-label">Email:</span> ${email}</div>
                
                <div class="field-value"><span class="field-label">Address:</span> ${address}</div>
                
                <div class="field-value"><span class="field-label">Education:</span> ${education}</div>
                <div class="field-value"><span class="field-label">Experience:</span> ${experience}</div>
                
                <div class="field-value"><span class="field-label">Resume:</span> <a href="${resume}" target="_blank" style="color: #00796b; text-decoration: underline;">Download Resume</a></div>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Suvira Energy. All rights reserved.<br>
                <a href="https://www.suvira.com">Visit our website</a>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error("Failed to send Job Application form email:", err);
      return res
        .status(500)
        .json({ message: "Failed to send Job Application form details" });
    }

    const jobApplication = await JobApplicationSchema.create({
      jobId,
      fullName,
     
      contactNumber,
      email,
      
      address,
      
      education,
      experience,
      
      resume,
    });

    return res.status(200).json({
      success: true,
      message: "Your job application has been sent successfully.",
      jobApplication,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate key error.",
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

const createContactForm = async (req, res) => {
  try {
    const { name, businessMail, companyName, contactNumber, message } =
      req.body;

    if (!name || !businessMail || !companyName || !contactNumber || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const data = await Logo.findOne();
    const contactEmail = data.email;

    const mailOptions = {
      from: '"Contact Form - Suvira Energy" <no-reply@suvira.com>',
      to: contactEmail,
      subject: "New Contact Form Submission",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 650px;
                margin: 30px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              }
              .header {
                font-size: 26px;
                font-weight: 700;
                text-align: center;
                color: #ffffff;
                background-color: #00796b;
                padding: 20px;
                border-radius: 8px 8px 0 0;
              }
              .content {
                padding: 30px;
                font-size: 16px;
                line-height: 1.8;
              }
              .content strong {
                color: #00796b;
              }
              .content p {
                margin: 15px 0;
              }
              .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #777777;
                background-color: #f1f1f1;
                border-radius: 0 0 8px 8px;
              }
              .footer a {
                color: #00796b;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                New Contact Form Submission
              </div>
              <div class="content">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${businessMail}</p>
                <p><strong>Company Name:</strong> ${companyName}</p>
                <p><strong>Contact Number:</strong> ${contactNumber}</p>
                <p><strong>Message:</strong><br>${message}</p>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Suvira Energy. All rights reserved.<br>
                <a href="https://www.suvira.com">Visit our website</a>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error("Failed to send contact form email:", err);
      return res
        .status(500)
        .json({ message: "Failed to send contact form details" });
    }

    await ContactSchema.create({
      name,
      businessMail,
      companyName,
      contactNumber,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Contact form details sent successfully",
    });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const Send_Otp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const userExist = await AuthSchema.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Email is not registered." });
    }

    const otpExist = await OtpSchema.findOne({ email });
    if (otpExist) {
      await OtpSchema.deleteOne({ email });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Forget Password - Suvira Energy" <no-reply@suvira.com>',
      to: email,
      subject: "Password Reset OTP - Suvira Energy",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f7f7f7;
              }
              .container {
                max-width: 650px;
                margin: 30px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              }
              .header {
                font-size: 28px;
                font-weight: 700;
                text-align: center;
                color: #ffffff;
                background-color: #d32f2f;
                padding: 20px;
                border-radius: 8px 8px 0 0;
              }
              .content {
                padding: 30px;
                font-size: 16px;
                text-align: center;
              }
              .otp {
                font-size: 24px;
                font-weight: 700;
                color: #d32f2f;
                margin: 20px 0;
                background-color: #f1f1f1;
                padding: 10px;
                border-radius: 5px;
                display: inline-block;
              }
              .instructions {
                font-size: 14px;
                color: #555;
                margin-top: 10px;
              }
              .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #777;
                background-color: #f1f1f1;
                border-radius: 0 0 8px 8px;
              }
              .footer a {
                color: #d32f2f;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">OTP for Password Reset</div>
              <div class="content">
                <p>Your OTP for resetting your password is:</p>
                <div class="otp">${otp}</div>
                <p>Please use this OTP within the next 10 minutes to reset your password.</p>
                <p class="instructions">If you did not request this, please ignore this email or <a href="https://www.suvira.com/contact">contact support</a>.</p>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Suvira Energy. All rights reserved.<br>
                <a href="https://www.suvira.com">Visit our website</a>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    await OtpSchema.create({ email, otp });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const createLogo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { logo, title } = req.body;

    // Verify user existence
    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }

    // Check user status
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can't access the details.",
      });
    }

    // Check for existing logo
    const existingLogo = await Logo.findOne();
    if (existingLogo) {
      await Logo.findByIdAndUpdate(existingLogo._id, { logo, title });
    } else {
      await Logo.create({ logo, title });
    }

    return res.status(200).json({
      success: true,
      message: existingLogo
        ? "Logo updated successfully."
        : "New logo added successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      author,
      sector,
      source,
      title,
      content,
      authorImg,
      blogImg,
      views,
      likes,
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

    await BlogSchema.create({
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
      message: "Blogs Added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    const userId = req.user._id;
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

    await NewsSchema.create({
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
      message: "News Added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const createClient = async (req, res) => {
  try {
    const userId = req.user._id;
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

    const existingClient = await ClientName.findOne({ name });
    if (existingClient) {
      return res.status(403).json({ msg: "Client Already Exists" });
    }

    await ClientName.create({
      name,
      img,
    });

    return res.status(200).json({
      success: true,
      message: "Client Added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const createFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
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

    const existingFeedback = await FeedbackSchema.findOne({ author });
    if (existingFeedback) {
      return res.status(403).json({ msg: "Feedback Already Exists" });
    }

    await FeedbackSchema.create({
      author,
      feedback,
      rating,
      img,
    });

    return res.status(200).json({
      success: true,
      message: "Feedback Added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const createJobPosting = async (req, res) => {
  try {
    const userId = req.user._id;
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

    const existJob = await JobPosting.findOne({ title });
    if (existJob) {
      return res.status(402).json({
        message: "Already Job Exist with this title.",
      });
    }

    await JobPosting.create({
      title,
      role,
      location,
      date,
      detail,
    });

    return res.status(200).json({
      success: true,
      message: "New Job Posted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const userId = req.user._id;
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

    await ProductSchema.create({
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
      message: "Product Added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const userId = req.user._id;
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

    await ServiceSchema.create({
      logo,
      title,
      desc,
    });

    return res.status(200).json({
      success: true,
      message: "Service Added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const createInnerService = async (req, res) => {
  try {
    const userId = req.user._id;
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

    service.InnerServices.push({
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
    });

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Service added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const AddSection = async (req, res) => {
  try {
    const userId = req.user._id;
    const { serviceName, name } = req.body;

    if (!serviceName || !name) {
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

    // Check if the section name already exists
    const sectionExists = service.section.some(
      (section) => section.name === name
    );
    if (sectionExists) {
      return res.status(400).json({ message: "Section name already exists." });
    }

    service.section.push({
      name,
    });

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Service section added successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

module.exports = {
  AddSection,
  createJobApplication,
  createInnerService,
  createLogo,
  createBlog,
  createNews,
  createClient,
  createFeedback,
  createJobPosting,
  createProduct,
  createContactForm,
  createService,
  Send_Otp,
};
