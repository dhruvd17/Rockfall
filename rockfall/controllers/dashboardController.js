const showDashboard = (req, res) => {
  res.render("dashboard", { activePage: "dashboard", user: req.session.user });
};

const showAlerts = (req, res) => {
  res.render("alert", { activePage: "alert", user: req.session.user });
};

const showDataUpload = (req, res) => {
  res.render("dataupload", { user: req.session.user });
};

const showSettings = (req, res) => {
  res.render("settings", { user: req.session.user });
};

const showHelp = (req, res) => {
  res.render("help", { user: req.session.user });
};

const showForecast = (req, res) => {
  res.render("forecast", {
    user: req.session.user,
    bestProb: 25,
    mostProb: 50,
    worstProb: 25,
    modelAccuracy: "87.5%",
    lastUpdated: "2 hours ago",
  });
};

const showRiskmap = (req, res) => {
  res.render("riskmap.ejs", { user: req.session.user });
};

module.exports = {
  showDashboard,
  showAlerts,
  showSettings,
  showHelp,
  showForecast,
  showRiskmap,
  showDataUpload,
};
