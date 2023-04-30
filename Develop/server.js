// Required Imports
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();

// Create DB connection
const db = mysql.createConnection(
    {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST
    },
    console.log(`Connected to the company_db database.`)
);

console.log(db);
