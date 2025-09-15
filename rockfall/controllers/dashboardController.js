
const showDashboard = (req, res) => {
  res.render("dashboard", { activePage: "dashboard" });
};


const showAlerts = (req, res) => {
  res.render("alert", { activePage: "alert" });
};
const showDataUpload = (req, res) => {
    res.render("dataupload", { activePage: "dataupload" });
};



const showSettings = (req, res) => {
  res.render("settings");
};


const showHelp = (req, res) => {
  res.render("help");
};


const showForecast = (req, res) => {
  res.render("forecast", {
    bestProb: 25,
    mostProb: 50,
    worstProb: 25,
    modelAccuracy: "87.5%",
    lastUpdated: "2 hours ago",
  });
};


const showRiskmap = (req, res) => {
  res.render("riskmap");
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
