const db = require("../config/db");

// Find user by email
const findAccountByEmail = async (email) => {
  const queryText = "SELECT * FROM rm_account WHERE LOWER(email) = LOWER($1)";
  const result = await db.query(queryText, [email]);
  return result.rows[0]; // assuming email is unique
};

// Create new user
const createAccount = async (email, hashedPassword) => {
  const queryText =
    "INSERT INTO rm_account (email, password_hash) VALUES ($1, $2)";
  await db.query(queryText, [email, hashedPassword]);
};

const updateAccount = async (rm_number, email) => {
  const queryText = "UPDATE rm_account SET email = $1 WHERE rm_number = $2";
  await db.query(queryText, [email, rm_number]);
};

const updatePassword = async (email, hashedPassword) => {
  const queryText =
    "UPDATE rm_account SET password_hash = $1 WHERE LOWER(email) = LOWER($2)";
  await db.query(queryText, [hashedPassword, email]);
};

module.exports = {
  findAccountByEmail,
  createAccount,
  updateAccount,
  updatePassword,
};
