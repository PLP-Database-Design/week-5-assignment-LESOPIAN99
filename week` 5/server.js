// Import necessary modules
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Setup the MySQL connection using credentials from .env file
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});




// Retrieve all patients
app.get('/patients', (req, res) => {
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching patients:', err);
        return res.status(500).json({ error: 'Failed to retrieve patients' });
      }
      res.json(results);
    });
  });
  
  
  
  
// Retrieve all providers
app.get('/providers', (req, res) => {
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching providers:', err);
      return res.status(500).json({ error: 'Failed to retrieve providers' });
    }
    res.json(results);
  });
});


// Retrieve patients by first name
app.get('/patients/search', (req, res) => {
    const { first_name } = req.query;
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  
    db.query(sql, [first_name], (err, results) => {
      if (err) {
        console.error('Error searching patients:', err);
        return res.status(500).json({ error: 'Failed to search patients' });
      }
      res.json(results);
    });
  });
  
  

  
// Retrieve providers by specialty
app.get('/providers/specialty', (req, res) => {
  const { specialty } = req.query;
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';

  db.query(sql, [specialty], (err, results) => {
    if (err) {
      console.error('Error fetching providers by specialty:', err);
      return res.status(500).json({ error: 'Failed to retrieve providers by specialty' });
    }
    res.json(results);
  });
});


const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const APP = express();
app.use(express.json());

// Setup the MySQL connection
const DB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// 1. Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(500).json({ error: 'Failed to retrieve patients' });
    }
    res.json(results);
  });
});

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching providers:', err);
      return res.status(500).json({ error: 'Failed to retrieve providers' });
    }
    res.json(results);
  });
});

// 3. Filter patients by first name
app.get('/patients/search', (req, res) => {
  const { first_name } = req.query;
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';

  db.query(sql, [first_name], (err, results) => {
    if (err) {
      console.error('Error searching patients:', err);
      return res.status(500).json({ error: 'Failed to search patients' });
    }
    res.json(results);
  });
});

// 4. Retrieve providers by specialty
app.get('/providers/specialty', (req, res) => {
  const { specialty } = req.query;
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';

  db.query(sql, [specialty], (err, results) => {
    if (err) {
      console.error('Error fetching providers by specialty:', err);
      return res.status(500).json({ error: 'Failed to retrieve providers by specialty' });
    }
    res.json(results);
  });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});