const express = require('express');
const { getCustomerIDListController, getCustomerDetailsController } = require('../controllers/customer-details-controller');

const router = express.Router();

router.get('/customer-id-list', getCustomerIDListController);
router.get('/customer-details', getCustomerDetailsController);

module.exports = router;