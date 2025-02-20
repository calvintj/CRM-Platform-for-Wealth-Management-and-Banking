const { getTotalCustomer } = require("../models/overview");

const getTotalCustomerController = async (req, res) => {
  const { rm_number, customerRisk } = req.query;
  const totalCustomer = await getTotalCustomer(rm_number, customerRisk);
  res.json(totalCustomer);
};

module.exports = { getTotalCustomerController };