const express = require("express");
const router = express.Router();
const { getCustomerListController } = require("../controllers/customer-list-controller");

router.get("/customer-list", getCustomerListController);

module.exports = router;