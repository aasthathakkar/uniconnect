const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/post')
const Event = require('./models/Events');

const mongoURI = 'mongodb://localhost:27017/uniconnect';

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB 🚀');

    // Clear old data (optional for clean start)
    await User.deleteMany();
    await Post.deleteMany();
    await Event.deleteMany();

    // Create users
    const users = await User.insertMany([
      {
        userId: 'aastha_thakkar',
        name: 'Aastha Thakkar',
        avatar: 'Aastha animated.jpg',
        college: 'IIIT Vadodara',
        branch: 'Computer Science',
        skills: ['UI/UX Design', 'Node.js', 'Express.js'],
        pastParticipations: ['HackIIITV', 'Designathon'],
        achievements: ["Won Smart India Hackathon", "Top 5 in IIITV CodeWars"],
        socialMedia: {
          linkedin: 'https://linkedin.com/in/aasthathakkar',
          github: 'https://github.com/aasthathakkar'
        },
        email: 'thakkaraastha12@gmail.com',
        phone: '+91 9265017437',
      },
      {
        userId: 'sairaj_raithatha',
        name: 'Sairaj Raithatha',
        avatar: 'Boy Animated.jpg',
        college: 'NIT Patna',
        branch: 'Computer Science',
        skills: ['Backend Development', 'AI/ML', 'Node.js', 'Python'],
        pastParticipations: ['SIH 2023', 'TechCrunch India'],
        achievements: ["Built a popular open-source library", "Top AI/ML Hackathon Winner"],
        socialMedia: {
          linkedin: 'https://linkedin.com/in/sairajraithatha',
          github: 'https://github.com/sairajraithatha'
        },
        email: 'sairajraithatha1@gmail.com',
        phone: '+1987654321',
      },
    ]);

    // Create one event and get its ID
    const event = await Event.create({
      title: 'Google Hackathon',
      description: 'Hackathon organized by Google for university students.',
      date: new Date('2025-04-10'),
      createdBy: users[0]._id, // you can change this if needed
    });

    // Create posts linked to the event
    await Post.insertMany([
      {
        user: users[0]._id,
        eventId: event._id,
        requirements: [
          'Looking for 2 team members',
          'Strong knowledge of backend development required',
          'Experience with node.js and express.js',
          'Good communication skills',
        ],
        content:
          "Looking for a backend developer to join our team! We're working on an exciting project that requires robust backend support and seamless API integrations. If you're passionate about building scalable systems, we'd love to have you on board!",
      },
      {
        user: users[1]._id,
        eventId: event._id,
        requirements: [
          'Need 1 UI/UX designer',
          'Proficiency in Figma required',
          'Knowledge of React is a plus',
          'Available for full hackathon duration',
        ],
        content:
          "Looking for a creative UI/UX designer to join our team! We're working on a revolutionary health-tech solution. Our team currently has strong backend and ML capabilities, but we need someone to make our product user-friendly and beautiful.",
      },
    ]);

    console.log('✅ Sample users, event, and posts inserted successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
