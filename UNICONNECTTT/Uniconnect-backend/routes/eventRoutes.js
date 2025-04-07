const express = require('express');
const { createEvent, getAllEvents, updateEvent, deleteEvent, filterEventsByDate } = require('../controllers/eventControllers');
const { authenticate } = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// POST: Create a new event with validation
router.post(
    '/create', 
    authenticate, 
    [
        check('title', 'Title is required').notEmpty(),
        check('date', 'Please provide a valid date').isISO8601(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, 
    createEvent
);

// GET: Retrieve all events (authentication required)
router.get('/all', getAllEvents);
// router.get('/filter', filterEventsByDate);
router.get('/filterByDate', filterEventsByDate);


// PUT: Update a specific event by ID (authentication required)
router.put('/update/:id', authenticate, updateEvent);

// DELETE: Delete a specific event by ID (authentication required)
router.delete('/delete/:id', authenticate, deleteEvent);

module.exports = router;
