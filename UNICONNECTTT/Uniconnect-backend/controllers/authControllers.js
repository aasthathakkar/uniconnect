const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const config = require('../config/config');

// User Registration
exports.register = async (req, res) => {
    const { name, branch, college, email, phone, password } = req.body;
    try {
        // Check for duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, branch, college, email, phone, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error during user registration. Please try again later.' });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error during login. Please try again later.' });
    }
};

//this code takes user input and hashes the password then saves the new user to mongodb database 
//for login process it verifies email and password and generates a JWT Token 

//it is important for hashing passwords and protect user data 
//it also helps in authentication and modularity 