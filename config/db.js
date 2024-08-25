const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

    // SQL query to create the "school" table
    const createTable = `
        CREATE TABLE IF NOT EXISTS school (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            latitude FLOAT,
            longitude FLOAT
        )
    `;

    // Execute the query to create the table
    connection.query(createTable, (err, results) => {
        if (err) {
            console.error('Error creating the school table:', err);
            return;
        }
        console.log('School table created successfully.');
    });
});

module.exports = connection;
