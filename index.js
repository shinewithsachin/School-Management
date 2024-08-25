const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const connection = require("./config/db");


app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validate input data
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    // Insert the new school into the database
    const query = 'INSERT INTO school (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, address, latitude, longitude], (err, results) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'School added successfully', schoolId: results.insertId });
    });
});

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    // Validate user coordinates
    if (typeof latitude !== 'string' || typeof longitude !== 'string' ||
        isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
        return res.status(400).json({ error: 'Invalid coordinates' });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const query = 'SELECT id, name, address, latitude, longitude FROM school';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        const schools = results.map((school) => {
            const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school, distance };
        });

        // Sort schools by distance
        schools.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schools);
    });
});


app.listen(process.env.PORT || 4000 , (error) => {
    if (error) throw error;
    console.log(`Server is running on port ${process.env.PORT}`);
});

