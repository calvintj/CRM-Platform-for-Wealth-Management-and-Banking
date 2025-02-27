const { getCustomerIDList, getCustomerDetails } = require("../models/customer-details");

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

module.exports = { getCustomerIDListController, getCustomerDetailsController };