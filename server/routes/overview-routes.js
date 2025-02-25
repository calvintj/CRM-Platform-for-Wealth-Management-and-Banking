const express = require("express");
const router = express.Router();
const {
  getTotalCustomerController,
  getTotalAUMController,
  getTotalFBIController,
  getQuarterlyFUMController,
  getQuarterlyFBIController,
  getTopProductsController,
} = require("../controllers/overview-controller");

router.get("/total-customer", getTotalCustomerController);
router.get("/total-aum", getTotalAUMController);
router.get("/total-fbi", getTotalFBIController);
router.get("/quarterly-fbi", getQuarterlyFBIController);
router.get("/quarterly-fum", getQuarterlyFUMController);
router.get("/top-products", getTopProductsController);

module.exports = router;