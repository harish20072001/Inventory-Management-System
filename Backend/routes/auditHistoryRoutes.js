const express = require('express');
const router = express.Router();
const auditController = require('../controller/auditHistortController');
 
 
router.get('/audit/history',auditController.getAuditHistory);
 
router.get('/audit/history/:id', auditController.getAuditHistoryById);
 
 
router.put('/audit/history/:id', auditController.updateAuditHistoryById);
 
 
router.delete('/audit/history/:id', auditController.deleteAuditHistoryById);

module.exports = router;
 