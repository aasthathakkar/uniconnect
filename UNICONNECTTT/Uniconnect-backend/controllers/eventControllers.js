const Event = require('../models/Events');  // Importing Event model
const { mergeSort } = require('../DSA/sorting');  // Importing merge sort from DSA folder

// Create a new event
exports.createEvent = async (req, res) => {
    const { title, description, date, location } = req.body;

    // Check if an image file was uploaded
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const newEvent = new Event({ title, description, date, location, image });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ error: 'Server error while creating event. Please try again later.' });
    }
};


// Read all events and return them sorted by date
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        // Sort full events by event.date
        const sortedEvents = mergeSort(events, (a, b) => new Date(a.date) - new Date(b.date));

        res.status(200).json(sortedEvents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events. Please try again later.' });
    }
};

exports.filterEventsByDate = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;

        // Basic validation
        if (!start_date || !end_date) {
            return res.status(400).json({ message: 'Start and End dates are required' });
        }

        const events = await Event.find({
            date: {
                $gte: new Date(start_date),
                $lte: new Date(end_date),
            },
        });

        res.status(200).json(events);
    } catch (error) {
        console.error('Error filtering events by date:', error);
        res.status(500).json({ message: 'Server error while filtering events' });
    }
};


// Read a specific event by ID (GET request)
exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching event details' });
    }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(
            id,
            { title, description, date, location },
            { new: true, runValidators: true }  // Return the updated event and run validators
        );
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        res.status(500).json({ error: 'Error updating event' });
    }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting event' });
    }
};


