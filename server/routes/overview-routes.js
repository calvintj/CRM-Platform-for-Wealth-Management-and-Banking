const express = require("express");
const router = express.Router();
const { getTotalCustomerController } = require("../controllers/overview-controller");

router.get("/total-customer", getTotalCustomerController);

module.exports = router;