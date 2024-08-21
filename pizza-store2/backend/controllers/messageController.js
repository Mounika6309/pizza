// controllers/messageController.js
const Message = require('../models/messageModel');
const User = require('../models/userModel');

// Send a new message
exports.sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;
    try {
        const message = new Message({
            sender: req.user._id,  // Assuming the user is authenticated
            receiver: receiverId,
            content
        });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', message });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all messages for a user
exports.getMessagesForUser = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.user._id }, { receiver: req.user._id }]  // Either sender or receiver is the logged-in user
        }).populate('sender', 'username').populate('receiver', 'username').sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update message status (e.g., mark as read)
exports.updateMessageStatus = async (req, res) => {
    const { messageId, status } = req.body;
    try {
        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ message: 'Message not found' });
        
        message.status = status;
        await message.save();
        
        res.json({ message: 'Message status updated', message });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message) return res.status(404).json({ message: 'Message not found' });
        
        await message.remove();
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
