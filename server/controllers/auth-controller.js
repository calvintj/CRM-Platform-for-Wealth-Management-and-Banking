const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findAccountByEmail, createAccount } = require('../models/rm-account');
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('❌ JWT_SECRET is not defined in the .env file');
}

// 🟢 LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const account = await findAccountByEmail(email);
    if (!account) {
      return res.status(400).json({ error: 'Invalid email.' });
    }

    const isMatch = await bcrypt.compare(password, account.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({ id: account.rm_account_id, email: account.email, rm_number: account.rm_number }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// 🟢 REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const existingAccount = await findAccountByEmail(email);
    if (existingAccount) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createAccount(email, hashedPassword);

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginUser, registerUser };
