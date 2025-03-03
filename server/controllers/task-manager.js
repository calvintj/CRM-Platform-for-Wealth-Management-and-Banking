const {
  getManagedNumbers,
  getIncreasedNumbers,
  getPortfolio,
  getLastTransaction,
  getPotentialTransaction,
} = require("../models/task-manager");

const getManagedNumbersController = async (req, res) => {
  const { rm_number } = req.query;
  const managedNumber = await getManagedNumbers(rm_number);
  res.json(managedNumber);
};

const getIncreasedNumbersController = async (req, res) => {
  const { rm_number } = req.query;
  const increasedNumber = await getIncreasedNumbers(rm_number);
  res.json(increasedNumber);
};

const getPortfolioController = async (req, res) => {
  const { rm_number } = req.query;
  const portfolio = await getPortfolio(rm_number);
  res.json(portfolio);
};

const getLastTransactionController = async (req, res) => {
    const {rm_number} = req.query;
    const lastTransaction = await getLastTransaction(rm_number);
    res.json(lastTransaction);
}

const getPotentialTransactionController = async (req, res) => {
    const {rm_number} = req.query;
    const potentialTransaction = await getPotentialTransaction(rm_number);
    res.json(potentialTransaction);
}

module.exports = {
  getManagedNumbersController,
  getIncreasedNumbersController,
  getPortfolioController,
  getLastTransactionController,
  getPotentialTransactionController,
};
