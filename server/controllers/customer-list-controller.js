const { getCustomerList } = require("../models/customer-list");
const { getCertainCustomerList } = require("../models/customer-list");

const getCustomerListController = async (req, res) => {
  const { rm_number } = req.query;
  const customerList = await getCustomerList(rm_number);
  res.json(customerList);
};

const getCertainCustomerListController = async (req, res) => {  
  const { rm_number, propensity, aum } = req.query;
  const customerList = await getCertainCustomerList(rm_number, propensity, aum);
  res.json(customerList);
};

module.exports = { getCustomerListController, getCertainCustomerListController };
