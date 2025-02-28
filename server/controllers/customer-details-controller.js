const {
  getCustomerIDList,
  getCustomerDetails,
  getCustomerPortfolio,
  getOptimizedPortfolio,
  getOwnedProduct,
} = require("../models/customer-details");

const getCustomerIDListController = async (req, res) => {
  const { rm_number } = req.query;
  const customerIDList = await getCustomerIDList(rm_number);
  res.json(customerIDList);
};

const getCustomerDetailsController = async (req, res) => {
  const { rm_number, customerID } = req.query;
  const customerDetails = await getCustomerDetails(rm_number, customerID);
  res.json(customerDetails);
};

const getCustomerPortfolioController = async (req, res) => {
  const { rm_number, customerID } = req.query;
  const customerPortfolio = await getCustomerPortfolio(rm_number, customerID);
  res.json(customerPortfolio);
};

const getOptimizedPortfolioController = async (req, res) => {
  const { rm_number, customerID } = req.query;
  const optimizedPortfolio = await getOptimizedPortfolio(rm_number, customerID);
  res.json(optimizedPortfolio);
};

const getOwnedProductController = async (req, res) => {
  const { rm_number, customerID } = req.query;
  const ownedProduct = await getOwnedProduct(rm_number, customerID);
  res.json(ownedProduct);
};

module.exports = {
  getCustomerIDListController,
  getCustomerDetailsController,
  getCustomerPortfolioController,
  getOptimizedPortfolioController,
  getOwnedProductController,
};
