// routes/messageRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { sendMessage, getMessagesForUser, updateMessageStatus, deleteMessage } = require('../controllers/messageController');

const router = express.Router();

// Send a message (both admin and customer can send messages)
router.post('/send', protect, sendMessage);

// Get all messages for the logged-in user (both admin and customer)
router.get('/', protect, getMessagesForUser);

// Update the status of a message (e.g., mark as read)
router.put('/status', protect, updateMessageStatus);

// Delete a message
router.delete('/:messageId', protect, deleteMessage);

module.exports = router;
