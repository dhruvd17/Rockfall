const Rock = require("../models/rock");


const showLogin = (req, res) => {
  res.render("login");
};


const loginUser = async (req, res) => {
  try {
    const user = await Rock.findOne({ email: req.body.email });

    if (!user) {
      return res.render("login", { error: "User not found" });
    }

    if (user.password !== req.body.password) {
      return res.render("login", { error: "Incorrect password" });
    }

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong" });
  }
};


const showRegister = (req, res) => {
  res.render("registration");
};


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
