const express = require("express");
const {
  getCustomerIDListController,
  getCustomerDetailsController,
  getCustomerPortfolioController,
  getOptimizedPortfolioController,
  getOwnedProductController,
} = require("../controllers/customer-details-controller");

const router = express.Router();

router.get("/customer-id-list", getCustomerIDListController);
router.get("/customer-details", getCustomerDetailsController);
router.get("/customer-portfolio", getCustomerPortfolioController);
router.get("/optimized-portfolio", getOptimizedPortfolioController);
router.get("/owned-product", getOwnedProductController);
module.exports = router;
