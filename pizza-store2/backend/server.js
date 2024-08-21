const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cors1 ={
    origin:"http://localhost:3000",
    methods:["POST",'GET'],
    allowedHeaders: 'Content-Type,Authorization'
};


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(cors1));

// Route imports
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const billRoutes = require('./routes/billRoutes');
const messageRoutes = require('./routes/messageRoutes');



// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/messages', messageRoutes); 



// MongoDB connection
mongoose.connect('mongodb+srv://test1:test@cluster0.bcrkjdi.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));