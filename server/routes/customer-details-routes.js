const express = require("express");
const {
  getCustomerIDListController,
  getCustomerDetailsController,
  getRecommendationProductController,
  getCustomerPortfolioController,
  getOptimizedPortfolioController,
  getReturnPercentageController,
  getOwnedProductController,
  getActivityController,
  postActivityController,
} = require("../controllers/customer-details-controller");

const router = express.Router();

router.get("/customer-id-list", getCustomerIDListController);
router.get("/customer-details", getCustomerDetailsController);
router.get("/recommendation-product", getRecommendationProductController);
router.get("/customer-portfolio", getCustomerPortfolioController);
router.get("/optimized-portfolio", getOptimizedPortfolioController);
router.get("/return-percentage", getReturnPercentageController);
router.get("/owned-product", getOwnedProductController);
router.get("/get-activity", getActivityController);
router.post("/post-activity", postActivityController);
module.exports = router;
