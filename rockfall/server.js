const express = require("express");
const mongoose = require("mongoose");
const path = require("path");


const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const port = 3000;


mongoose.connect("mongodb://127.0.0.1:27017/rockFall")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB Error:", err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", authRoutes);         
app.use("/", dashboardRoutes);    


app.get("/", (req, res) => res.redirect("/login"));


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
