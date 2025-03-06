const {
  getManagedNumbers,
  getIncreasedNumbers,
  getPortfolio,
  getLastTransaction,
  getPotentialTransaction,
  getTask,
  postTask,
  getOfferProductRisk,
  getReProfileRiskTarget,
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
  const { rm_number } = req.query;
  const lastTransaction = await getLastTransaction(rm_number);
  res.json(lastTransaction);
};

const getPotentialTransactionController = async (req, res) => {
  const { rm_number } = req.query;
  const potentialTransaction = await getPotentialTransaction(rm_number);
  res.json(potentialTransaction);
};

const getTaskController = async (req, res) => {
  const { rm_number } = req.query;
  const task = await getTask(rm_number);
  res.json(task);
};

const postTaskController = async (req, res) => {
  // Destructure task properties from req.body (not wrapped in a "task" object)
  const { description, invitee, due_date } = req.body;

  // Get rm_number from the token payload attached by authMiddleware
  const rm_number = req.user && req.user.rm_number;

  if (!rm_number) {
    return res.status(401).json({ error: "Unauthorized: missing token data" });
  }

  try {
    const newTask = await postTask({
      description,
      invitee,
      due_date,
      rm_number,
    });
    res.json(newTask);
  } catch (error) {
    console.error("Error posting task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
};

const getOfferProductRiskController = async (req, res) => {
  const { rm_number } = req.query;
  const offerProductRisk = await getOfferProductRisk(rm_number);
  res.json(offerProductRisk);
};

const getReProfileRiskTargetController = async (req, res) => {
  const { rm_number } = req.query;
  const reProfileRiskTarget = await getReProfileRiskTarget(rm_number);
  res.json(reProfileRiskTarget);
};

module.exports = {
  getManagedNumbersController,
  getIncreasedNumbersController,
  getPortfolioController,
  getLastTransactionController,
  getPotentialTransactionController,
  getTaskController,
  postTaskController,
  getOfferProductRiskController,
  getReProfileRiskTargetController,
};
