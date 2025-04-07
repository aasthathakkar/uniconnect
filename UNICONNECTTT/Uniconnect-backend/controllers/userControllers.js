const User = require('../models/User');

// Get User Details for Profile Page
exports.fetchUserProfile = async (req, res) => {
  try {
    // Retrieve user from DB using authenticated user ID, exclude password field
    const currentUser = await User.findById(req.user.id).select('-password');
    
    if (!currentUser) {
      return res.status(404).json({ error: 'Oops! User not found in the database.' });
    }

    res.status(200).json(currentUser);
  } catch (error) {
    console.error('Profile Fetch Error:', error);
    res.status(500).json({ error: 'Something went wrong on our end. Please try again.' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};