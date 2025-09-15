const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");


router.get("/dashboard", dashboardController.showDashboard);
router.get("/alerts", dashboardController.showAlerts);
router.get("/settings", dashboardController.showSettings);
router.get("/help", dashboardController.showHelp);
router.get("/forecast", dashboardController.showForecast);
router.get("/riskmap", dashboardController.showRiskmap);
router.get("/dataupload", dashboardController.showDataUpload);
 


router.get("/alertpref", (req, res) => res.render("alertpref"));
router.get("/userman", (req, res) => res.render("userman"));
router.get("/datasour", (req, res) => res.render("datasour"));
router.get("/systems", (req, res) => res.render("systems"));
router.get("/faq", (req, res) => res.render("faq"));
router.get("/tutorials", (req, res) => res.render("tutorials"));
router.get("/support", (req, res) => res.render("support"));
router.get("/resources", (req, res) => res.render("resources"));

module.exports = router;
