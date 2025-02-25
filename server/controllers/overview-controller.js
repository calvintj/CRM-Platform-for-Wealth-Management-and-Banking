const {
  getTotalCustomer,
  getTotalAUM,
  getTotalFBI,
  getQuarterlyFBI,
  getQuarterlyFUM,
  // getTopProducts,
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

const getQuarterlyFUMController = async (req, res) => {
  const { rm_number, customerRisk } = req.query;
  const quarterlyFUM = await getQuarterlyFUM(rm_number, customerRisk);
  res.json(quarterlyFUM);
};

const getQuarterlyFBIController = async (req, res) => {
  const { rm_number, customerRisk } = req.query;
  const quarterlyFBI = await getQuarterlyFBI(rm_number, customerRisk);
  res.json(quarterlyFBI);
};

const getTopProductsController = async (req, res) => {
  const { rm_number, customerRisk } = req.query;
  const topProducts = await getTopProducts(rm_number, customerRisk);
  res.json(topProducts);
};

module.exports = {
  getTotalCustomerController,
  getTotalAUMController,
  getTotalFBIController,
  getQuarterlyFBIController,
  getQuarterlyFUMController,
  getTopProductsController,
};
