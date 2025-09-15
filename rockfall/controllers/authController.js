const Rock = require("../models/rock");

// GET /login
const showLogin = (req, res) => {
  res.render("login");
};

// POST /login
const loginUser = async (req, res) => {
  try {
    const user = await Rock.findOne({ email: req.body.email });

    if (!user) {
      console.log("❌ User not found");
      return res.redirect("/login");
    }

    if (user.password !== req.body.password) {
      console.log("❌ Wrong password");
      return res.redirect("/login");
    }

    console.log("✅ Login successful");
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

// GET /register
const showRegister = (req, res) => {
  res.render("registration");
};

// POST /register
const registerUser = async (req, res) => {
  try {
    const newUser = new Rock({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    await newUser.save();
    console.log("✅ User registered");
    res.redirect("/login");
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).send("Error registering user");
  }
};

module.exports = {
  showLogin,
  loginUser,
  showRegister,
  registerUser,
};
