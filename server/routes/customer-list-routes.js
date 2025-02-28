const express = require("express");
const router = express.Router();
const { getCustomerListController, getCertainCustomerListController } = require("../controllers/customer-list-controller");

router.get("/customer-list", getCustomerListController);
router.get("/customer-list/certain", getCertainCustomerListController);

module.exports = router;