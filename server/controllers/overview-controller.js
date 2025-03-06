const {
  getTotalCustomer,
  getTotalAUM,
  getTotalFBI,
  getQuarterlyFBI,
  getQuarterlyFUM,
  getTopProducts,
  getCertainCustomerList,
} = require("../models/overview");

const getTotalCustomerController = async (req, res) => {
  const { rm_number } = req.query;
  const totalCustomer = await getTotalCustomer(rm_number);
  res.json(totalCustomer);
};

const getTotalAUMController = async (req, res) => {
  const { rm_number } = req.query;
  const totalAUM = await getTotalAUM(rm_number);
  res.json(totalAUM);
};

const getTotalFBIController = async (req, res) => {
  const { rm_number } = req.query;
  const totalFBI = await getTotalFBI(rm_number);
  res.json(totalFBI);
};

const getQuarterlyFUMController = async (req, res) => {
  const { rm_number } = req.query;
  const quarterlyFUM = await getQuarterlyFUM(rm_number);
  res.json(quarterlyFUM);
};

const getQuarterlyFBIController = async (req, res) => {
  const { rm_number } = req.query;
  const quarterlyFBI = await getQuarterlyFBI(rm_number);
  res.json(quarterlyFBI);
};

const getTopProductsController = async (req, res) => {
  const { rm_number } = req.query;
  const topProducts = await getTopProducts(rm_number);
  res.json(topProducts);
};

const getCertainCustomerListController = async (req, res) => {
  const { rm_number, customerRisk } = req.query;
  const certainCustomerList = await getCertainCustomerList(
    rm_number,
    customerRisk
  );
  res.json(certainCustomerList);
};
module.exports = {
  getTotalCustomerController,
  getTotalAUMController,
  getTotalFBIController,
  getQuarterlyFBIController,
  getQuarterlyFUMController,
  getTopProductsController,
  getCertainCustomerListController,
};
