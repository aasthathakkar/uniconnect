const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const postroutes = require('./routes/postroutes');
const MONGO_URI = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Replaced body-parser with express.json()

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/uploads', express.static('public/uploads'));
// In server.js or routes/postRoutes.js
app.use('/api/posts', postroutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(MONGO_URI)
  .then(() => app.listen(3001, () => console.log('Server running on port 3001')))
  .catch(err => console.error(err));