const AuthSchema = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Logo = require("../models/Logo");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await AuthSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await AuthSchema.create({
      name,
      email,
      password: hashedPassword,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message:
        "Your account is created and is in Pending Status. You can log in once Admin approves it.",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await AuthSchema.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can log in once it's approved.",
      });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successfully",
      userInfo: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const userId = req.user._id;
    const existingUser = await AuthSchema.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can log in once it's approved.",
      });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successfully",
      userInfo: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const checkUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await AuthSchema.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    if (existingUser.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in Pending Status. You can log in once it's approved.",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Exist",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const allAdmins = async (req, res) => {
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

    const allUsers = await AuthSchema.find({ status: "Approved" });

    return res.status(200).json({
      success: true,
      admins: allUsers,
      message: "Admins fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const allAdminsRequest = async (req, res) => {
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

    const allUsers = await AuthSchema.find({ status: "Pending" });

    return res.status(200).json({
      success: true,
      admins: allUsers,
      message: "Admins Request fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const deleteAdmins = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
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

    const userToDelete = await AuthSchema.findOneAndDelete({ email });
    if (!userToDelete) {
      return res.status(404).json({ message: "User does not exist." });
    }

    return res.status(200).json({
      success: true,
      message: "Admin/User deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const approveAdmins = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
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

    const user = await AuthSchema.findOneAndUpdate(
      { email },
      { status: "Approved" },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    return res.status(200).json({
      success: true,
      message: "User approved successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

const updateMail = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
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

    const service = await Logo.findOneAndUpdate({}, { email }, { new: true });
    if (!service) {
      return res
        .status(404)
        .json({ message: "Something Went Wrong. Model Not Found." });
    }

    return res.status(200).json({
      success: true,
      message: "Email updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

module.exports = {
  register,
  login,
  allAdmins,
  checkUser,
  loginWithGoogle,
  approveAdmins,
  deleteAdmins,
  updateMail,
  allAdminsRequest,
};
