const express = require("express");
const router = express.Router();
const {
  getTotalCustomerController,
  getTotalAUMController,
  getTotalFBIController,
} = require("../controllers/overview-controller");

router.get("/total-customer", getTotalCustomerController);
router.get("/total-aum", getTotalAUMController);
router.get("/total-fbi", getTotalFBIController);

module.exports = router;