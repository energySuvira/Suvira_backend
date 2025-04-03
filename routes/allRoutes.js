const express = require("express");
const router = express.Router();
const { authMiddleware,GoogleAuthMiddleware } = require("../middleware/auth");
const {
  register,
  checkUser,
  loginWithGoogle,
  login,
  allAdminsRequest,
  allAdmins,
  approveAdmins,
  deleteAdmins,
  updateMail,
} = require("../controller/AuthController");
const {
  fetchAllBlogs,
  fetchAllNews,
  getClients,
  getFeedbacks,
  getJobPostings,
  getProducts,
  getServices,
  fetchJobApplications,
  fetchLogo,
} = require("../controller/FetchController");
const {
  createBlog,
  createNews,
  createClient,
  createFeedback,
  createJobPosting,
  createLogo,
  createProduct,
  createService,
  createJobApplication,
  createContactForm,
  createInnerService,
  Send_Otp,
  AddSection,
} = require("../controller/AddController");
const {
  updateBlog,
  updateNews,
  updateClient,
  updateFeedback,
  updateJobPosting,
  updateProduct,
  updateService,
  UpdateInnerService,
  UpdateCarrerBanner,
  Forget_Password,
} = require("../controller/UpdateController");
const {
  deleteBlog,
  deleteNews,
  deleteClient,
  deleteFeedback,
  deleteJobPosting,
  deleteProduct,
  deleteService,
  deleteInnerService,
  deleteSection,
} = require("../controller/DeleteController");
const {
  uploadFileController,
  uploadImageController,
  getUserInfo,
} = require("../controller/UploadController");
const { createSector,  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector, } = require("../controller/SectorController");
const { createSubsector,
  getAllSubsectors,
  getSubsectorById,
  updateSubsector,
  deleteSubsector } = require("../controller/SubsectorController");
const { createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory, } = require("../controller/CategoryController");

// Create Sector
router.post("/sectors", createSector); // Create Sector
router.get("/sectors", getAllSectors); // Get All Sectors
router.get("/sectors/:id", getSectorById); // Get Single Sector by ID
router.put("/sectors/:id", updateSector); // Update Sector by ID
router.delete("/sectors/:id", deleteSector); // Delete Sector by ID
router.post("/subsectors", createSubsector); // Create Subsector
router.get("/subsectors", getAllSubsectors); // Get All Subsectors
router.get("/subsectors/:id", getSubsectorById); // Get Single Subsector by ID
router.put("/subsectors/:id", updateSubsector); // Update Subsector by ID
router.delete("/subsectors/:id", deleteSubsector); // Delete Subsector by ID
router.post("/categories", createCategory);// Create Category
router.get("/categories", getAllCategories); // Get All Categories
router.get("/categories/:id", getCategoryById); // Get Single Category by ID
router.put("/categories/:id", updateCategory); // Update Category by ID
router.delete("/categories/:id", deleteCategory); // Delete Category by ID
//Carreer banner
router.post("/UpdateCarrerBanner", authMiddleware, UpdateCarrerBanner);

// Auth Routes
router.post("/checkUser", checkUser);
router.post("/loginWithGoogle", GoogleAuthMiddleware, loginWithGoogle);
router.post("/adminRegister", register);
router.post("/adminLogin", login);
router.post("/forgetPassword", Forget_Password);
router.post("/sendOtp", Send_Otp);
router.get("/allAdmins", authMiddleware, allAdmins);
router.get("/allAdminsRequest", authMiddleware, allAdminsRequest);
router.post("/approveAdmin", authMiddleware, approveAdmins);
router.post("/deleteAdmin", authMiddleware, deleteAdmins);
router.post("/updateMail", authMiddleware, updateMail);

// Blog Routes
router.post("/addBlog", authMiddleware, createBlog);
router.get("/fetchAllBlog", fetchAllBlogs); //GET_BLOGS
router.put("/updateBlog/:id", authMiddleware, updateBlog);
router.delete("/deleteBlog/:id", authMiddleware, deleteBlog);

//News Routes
router.post("/addNews", authMiddleware, createNews);
router.get("/fetchAllNews", fetchAllNews); //GET_News
router.put("/updateNews/:id", authMiddleware, updateNews);
router.delete("/deleteNews/:id", authMiddleware, deleteNews);

// Clients Routes
router.post("/Addclient", authMiddleware, createClient);
router.get("/GetClients", getClients); //GET_CLIENTS
router.put("/Editclient/:id", authMiddleware, updateClient);
router.delete("/Deleteclient/:id", authMiddleware, deleteClient);

//Contact Form Route
router.post("/contact", createContactForm);

// Feedback Route
router.post("/AddFeedback", authMiddleware, createFeedback);
router.get("/GetFeedbacks", getFeedbacks); //GET_FEEDBACKS
router.put("/EditFeedbacks/:id", authMiddleware, updateFeedback);
router.delete("/DeleteFeedbacks/:id", authMiddleware, deleteFeedback);

// Job Application Routes
router.post("/createJobApplication", createJobApplication);
router.get("/fetchJobApplications", authMiddleware, fetchJobApplications);

// Job Posting Routes
router.post("/AddJobPosting", authMiddleware, createJobPosting);
router.get("/GetJobPostings", getJobPostings); //GET_JOB_POSTINGS
router.put("/EditJobPostings/:id", authMiddleware, updateJobPosting);
router.delete("/DeleteJobPostings/:id", authMiddleware, deleteJobPosting);

// Change Logo
router.post("/AddLogo", authMiddleware, createLogo);
router.get("/fetchLogo", fetchLogo); //GET_LOGO

// Products
router.post("/AddProducts", authMiddleware, createProduct);
router.get("/GetProducts", getProducts); //GET_PRODUCTS
router.put("/EditProducts/:id", authMiddleware, updateProduct);
router.delete("/DeleteProducts/:id", authMiddleware, deleteProduct);

// Services
router.post("/AddServices", authMiddleware, createService);
router.get("/GetServices", getServices); //GET_SERVICES
router.put("/EditServices/:id", authMiddleware, updateService);
router.delete("/DeleteServices/:id", authMiddleware, deleteService);

//section
router.post("/AddSection", authMiddleware, AddSection);
router.delete("/DeleteSection/:name/:id", authMiddleware, deleteSection);

// Services
router.post("/InnerAddServices", authMiddleware, createInnerService);
router.put("/InnerEditServices/:id", authMiddleware, UpdateInnerService);
router.delete(
  "/InnerDeleteServices/:name/:id",
  authMiddleware,
  deleteInnerService
);

// Image Upload
router.post("/UploadImageOnServer", authMiddleware, uploadImageController);
// File Upload
router.post("/UploadFilesOnServer", uploadFileController);
// Get User Infp
router.post("/getUserInfo", authMiddleware, getUserInfo);

module.exports = router;
