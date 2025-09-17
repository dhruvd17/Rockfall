const Rock = require("../models/rock");


const showLogin = (req, res) => {
  res.render("login");
};


const loginUser = async (req, res) => {
  try {
    const user = await Rock.findOne({ email: req.body.email });

    if (!user) {
      console.log("❌ User not found");
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch || user.role !== req.body.role) {
      console.log("❌ Wrong password or role");
      req.flash("error", "Incorrect password or role");
      return res.redirect("/login");
    }

   
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    console.log("✅ Login successful");
    req.flash("success", "Login successful");
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong, please try again");
    res.redirect("/login");
  }
};


const showRegister = (req, res) => {
  res.render("registration");
};


const registerUser = async (req, res) => {
  try {
   
    const existingUser = await Rock.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) {
      console.log("Username or Email already in use");
      req.flash("error", "Username or Email already in use");
      return res.redirect("/register");
    }

   
    const newUser = new Rock({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, 
      role: req.body.role,
    });

    await newUser.save();
    console.log("✅ User registered");
    req.flash("success", "Account created successfully");
    res.redirect("/login");
  } catch (err) {
    console.error("Registration error:", err);
    req.flash("error", "Something went wrong, please try again");
    res.redirect("/register");
  }
};


const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Logout error:", err);
      return res.redirect("/dashboard");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};

module.exports = {
  showLogin,
  loginUser,
  showRegister,
  registerUser,
  logoutUser,
};
