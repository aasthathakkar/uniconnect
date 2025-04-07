// const jwt = require('jsonwebtoken');


exports.authenticate = (req, res, next) => {
    // const token = req.headers['authorization']?.split(' ')[1];
    // if (!token) {
    //     return res.status(401).json({ error: 'No token provided' });
    // }

    // jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         return res.status(401).json({ error: 'Failed to authenticate token' });
    //     }
    //     req.user = decoded;
    //    
    // });
    next();
};