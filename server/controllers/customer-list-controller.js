const { getCustomerList } = require("../models/customer-list");

const getCustomerListController = async (req, res) => {
  const { rm_number } = req.query;
  const customerList = await getCustomerList(rm_number);
  res.json(customerList);
};

module.exports = { getCustomerListController };
