require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || "production";
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.use("/", authRoutes);
app.use("/", dashboardRoutes);

app.get("/", (req, res) => res.redirect("/login"));


mongoose
  .connect(uri, {
    serverSelectionTimeoutMS: 5000, 
  })
  .then(() => {
    console.log("✅ Connected to MongoDB with Mongoose");
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
