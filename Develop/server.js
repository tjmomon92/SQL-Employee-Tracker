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

// Function to start program/return to Main
function init() {
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'What would you like to do?',
          name: 'menu',
          choices: ['See list of departments', 'See list of employees', 'See list of roles', 'Add a department', 'Add an employee', 'Add a role', 'Update employee role', 'Quit']
        }
      ])
      .then((response) => {
        if (response.menu == "See list of departments") {
          seeDepartments();
        } else if (response.menu == "See list of employees") {
          seeEmployees();
        } else if (response.menu == "See list of roles") {
          seeRoles();
        } else if (response.menu == "Add a department") {
          addDepartment();
        } else if (response.menu == "Add a role") {
          addRole();
        } else if (response.menu == "Add an employee") {
          addEmployee();
        } else if (response.menu == "Update employee role") {
          updateEmployeeRole();
        } else if (response.menu == "Quit") {
          process.exit(0)
        }
      })
  };

//   Call to start program
init();