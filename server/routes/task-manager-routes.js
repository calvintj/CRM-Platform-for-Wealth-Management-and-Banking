const express = require("express");
const router = express.Router();
const {
  getManagedNumbersController,
  getIncreasedNumbersController,
  getPortfolioController,
  getLastTransactionController,
  getPotentialTransactionController,
} = require("../controllers/task-manager");

router.get("/managed-number", getManagedNumbersController);
router.get("/increased-number", getIncreasedNumbersController);
router.get("/portfolio", getPortfolioController);
router.get("/last-transaction", getLastTransactionController);
router.get("/potential-transaction", getPotentialTransactionController);

module.exports = router;
