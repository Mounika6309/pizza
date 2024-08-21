// models/messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the sender (admin or customer)
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the receiver (admin or customer)
    content: { type: String, required: true },  // Message content
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },  // Message status
}, { 
    timestamps: true  // Automatically creates createdAt and updatedAt fields
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
