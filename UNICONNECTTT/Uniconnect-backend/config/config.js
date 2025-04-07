require('dotenv').config();

if (!process.env.MONGO_URI ) {
    console.error('Missing required environment variables (MONGO_URI or JWT_SECRET).');
    process.exit(1);  // Exit process if env variables are not set
}

module.exports = {
    MONGO_URI: process.env.MONGO_URI,   
    
};

//used to manage and load enviornment variables securely from a .env file 