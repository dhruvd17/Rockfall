const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const requireLogin = require("../middleware/auth");
const noCache = require("../middleware/noCache");

router.get("/dashboard", requireLogin, noCache, dashboardController.showDashboard);
router.get("/alerts", requireLogin, noCache, dashboardController.showAlerts);
router.get("/settings", requireLogin, noCache, dashboardController.showSettings);
router.get("/help", requireLogin, noCache, dashboardController.showHelp);
router.get("/forecast", requireLogin, noCache, dashboardController.showForecast);
router.get("/riskmap", requireLogin, noCache, dashboardController.showRiskmap);
router.get("/dataupload", requireLogin, noCache, dashboardController.showDataUpload);


 


router.get("/alertpref", (req, res) => res.render("alertpref"));
router.get("/userman", (req, res) => res.render("userman"));
router.get("/datasour", (req, res) => res.render("datasour"));
router.get("/systems", (req, res) => res.render("systems"));
router.get("/faq", (req, res) => res.render("faq"));
router.get("/tutorials", (req, res) => res.render("tutorials"));
router.get("/support", (req, res) => res.render("support"));
router.get("/resources", (req, res) => res.render("resources"));

module.exports = router;
