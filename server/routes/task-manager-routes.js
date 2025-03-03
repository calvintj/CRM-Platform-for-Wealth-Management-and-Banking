const express = require("express");
const router = express.Router();
const {
  getManagedNumbersController,
  getIncreasedNumbersController,
  getPortfolioController,
  getLastTransactionController,
} = require("../controllers/task-manager");

router.get("/managed-number", getManagedNumbersController);
router.get("/increased-number", getIncreasedNumbersController);
router.get("/portfolio", getPortfolioController);
router.get("/last-transaction", getLastTransactionController);

module.exports = router;
