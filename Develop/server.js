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

// SQL Queries
function seeDepartments() { 
    db.query('SELECT d.id AS department_id, d.name AS department_name FROM department AS d;', function (err, results) {
        console.table(results);
        start();
    });
  };
  
function seeEmployees() { 
    db.query("SELECT e.id AS employee_id, e.first_name, e.last_name, d.name AS department_name, r.title AS job_title, r.salary AS salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee as e INNER JOIN role AS r ON (e.role_id = r.id) INNER JOIN department AS d ON (r.department_id = d.id) LEFT JOIN employee AS m ON (e.manager_id = m.id);", function (err, results) {
        console.table(results);
        start();
    })

};

function seeRoles() {
    db.query("SELECT r.id AS role_id, r.title AS job_title, r.salary, d.name AS department_name, r.department_id FROM role AS r JOIN department AS d ON (r.department_id = d.id);", function (err, results) {
        console.table(results);
        start();
    });
};

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