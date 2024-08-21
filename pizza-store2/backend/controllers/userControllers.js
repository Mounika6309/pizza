const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body; // Now include email in destructuring
    try {
        const userExists = await User.findOne({ email }); // Check if user with the same email exists
        if (userExists) return res.status(400).json({ message: 'Email already in use' });
        
        const user = await User.create({ username, email, password, role });
        
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email, // Respond with the email as well
            role: user.role,
           
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};