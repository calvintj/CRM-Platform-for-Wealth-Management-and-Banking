const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getManagedNumbersController,
  getIncreasedNumbersController,
  getPortfolioController,
  getLastTransactionController,
  getPotentialTransactionController,
  getTaskController,
  postTaskController,
  getOfferProductRiskController,
  getReProfileRiskTargetController,
} = require("../controllers/task-manager");

// Example of unprotected routes
router.get("/managed-number", getManagedNumbersController);
router.get("/increased-number", getIncreasedNumbersController);
router.get("/portfolio", getPortfolioController);
router.get("/last-transaction", getLastTransactionController);
router.get("/potential-transaction", getPotentialTransactionController);
router.get("/get-task", getTaskController);
router.get("/offer-product-risk", getOfferProductRiskController);
router.get("/re-profile-risk-target", getReProfileRiskTargetController);
// Protect the POST route with authMiddleware
router.post("/post-task", authMiddleware, postTaskController);

module.exports = router;
