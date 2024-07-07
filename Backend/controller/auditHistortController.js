const AuditHistoryModel = require('../model/auditHistoryModel');
const logger = require('../Logger/logger');
 
const getAuditHistory = async (req, res) => {
    try {
        const auditHistory = await AuditHistoryModel.findAll();
        res.json(auditHistory);
    } catch (error) {
        console.error('Error fetching audit history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
 
const getAuditHistoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const entry = await AuditHistoryModel.findByPk(id);
        if (!entry) {
            return res.status(404).json({ error: 'Audit history not found' });
        }
        res.json(entry);
    } catch (error) {
        console.error('Error fetching audit history by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
 
 
const updateAuditHistoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user; // Assuming req.user contains user's information
        const updatedEntry = await AuditHistoryModel.update(req.body, { where: { id } });
        if (updatedEntry[0] === 0) {
            return res.status(404).json({ error: 'Audit history not found' });
        }
        res.json({ message: 'Audit history updated successfully' });
    } catch (error) {
        console.error('Error updating audit history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
 
const deleteAuditHistoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEntry = await AuditHistoryModel.destroy({ where: { id } });
        if (deletedEntry === 0) {
            return res.status(404).json({ error: 'Audit history not found' });
        }
        res.json({ message: 'Audit history deleted successfully' });
    } catch (error) {
        console.error('Error deleting audit history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
 
module.exports = {
    getAuditHistory,
    getAuditHistoryById,
    updateAuditHistoryById,
    deleteAuditHistoryById
};