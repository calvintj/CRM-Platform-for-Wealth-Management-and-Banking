const {
  getTotalCustomer,
  getTotalAUM,
  getTotalFBI,
} = require("../models/overview");

const getTotalCustomerController = async (req, res) => {
  const { rm_number, customerRisk } = req.query;
  const totalCustomer = await getTotalCustomer(rm_number, customerRisk);
  res.json(totalCustomer);
};

const getTotalAUMController = async (req, res) => {
  const { rm_number, customerRisk } = req.query;
  const totalAUM = await getTotalAUM(rm_number, customerRisk);
  res.json(totalAUM);
};

const getTotalFBIController = async (req, res) => {
  const { rm_number, customerRisk } = req.query;
  const totalFBI = await getTotalFBI(rm_number, customerRisk);
  res.json(totalFBI);
};

module.exports = {
  getTotalCustomerController,
  getTotalAUMController,
  getTotalFBIController,
};
