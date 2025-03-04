const {
  getCustomerIDList,
  getCustomerDetails,
  getRecommendationProduct,
  getCustomerPortfolio,
  getOptimizedPortfolio,
  getReturnPercentage,
  getOwnedProduct,
  getActivity,
  postActivity,
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

const getRecommendationProductController = async (req, res) => {
  const { customerID } = req.query;
  const recommendationProduct = await getRecommendationProduct(customerID);
  res.json(recommendationProduct);
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

const getReturnPercentageController = async (req, res) => {
  const { customerID } = req.query;
  const returnPercentage = await getReturnPercentage(customerID);
  res.json(returnPercentage);
};

const getOwnedProductController = async (req, res) => {
  const { rm_number, customerID } = req.query;
  const ownedProduct = await getOwnedProduct(rm_number, customerID);
  res.json(ownedProduct);
};

const getActivityController = async (req, res) => {
  const { bp_number_wm_core } = req.query;
  const activity = await getActivity(bp_number_wm_core);
  res.json(activity);
};

const postActivityController = async (req, res) => {
  const activity = req.body;
  const newActivity = await postActivity(activity);
  res.json(newActivity);
};

module.exports = {
  getCustomerIDListController,
  getCustomerDetailsController,
  getRecommendationProductController,
  getCustomerPortfolioController,
  getOptimizedPortfolioController,
  getReturnPercentageController,
  getOwnedProductController,
  getActivityController,
  postActivityController,
};
