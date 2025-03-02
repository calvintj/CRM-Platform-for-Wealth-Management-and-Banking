// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Import authentication routes
const authRoutes = require('./routes/auth-routes');
const overviewRoutes = require('./routes/overview-routes');
const customerListRoutes = require('./routes/customer-list-routes');
const customerDetailsRoutes = require('./routes/customer-details-routes');
const taskManagerRoutes = require('./routes/task-manager-routes');
// Mount auth routes at /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/customer-list', customerListRoutes);
app.use('/api/customer-details', customerDetailsRoutes);
app.use('/api/task-manager', taskManagerRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
