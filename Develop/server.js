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

// Functions to add data
async function addEmployee() {
    const add = await inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the new employee?",
            name: "employee_firstName"
        },
        {
            type: "input",
            message: "What is the last name of the new employee?",
            name: "employee_lastName"
        },
        {
            type: "input",
            message: "What is the new employee's role id?",
            name: "employee_roleId"
        },
        {
            type: "input",
            message: "What is the id number for the manager of this employee?",
            name: "employee_managerId"
        }
    ])
        db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES
                ('${add.employee_firstName}', '${add.employee_lastName}', ${add.employee_roleId}, ${add.employee_managerId});`,
        function () {
            console.log(`${add.employee_firstName} ${add.employee_lastName} has been added to the database.`);
    });
    start();
};

async function addDepartment() {
    const add = await inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you want to add?",
            name: "department_name"
        }
    ])
        db.query(
            `INSERT INTO department (name) VALUES ('${add.department_name}')`,
        function () {
            console.log(`${add.department} was added to the department table.`);
    });
    start();
};

async function addRole() {
    const add = await inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the role you want to add?",
            name: "role_title"
        },
        {
            type: "input",
            message: "What is the salary of this role?",
            name: "role_salary"
        },
        {
            type: "input",
            message: "What is the id number for the department that this role is associated with?",
            name: "department_id"
        }
    ])
        db.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES
                ('${add.role_title}', ${add.role_salary}, ${add.department_id});`,
        function () {
            console.log(`${add.role_title} has been added to the database.`);
        });
        start();
};

// Function to update info
async function updateEmployeeRole() {
    db.query("SELECT e.id AS employee_id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, d.name AS department_name, d.id AS department_id, r.title AS job_title, r.id AS role_id, r.salary AS salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee as e INNER JOIN role AS r ON (e.role_id = r.id) INNER JOIN department AS d ON (r.department_id = d.id) LEFT JOIN employee AS m ON (e.manager_id = m.id);", async function (err, results) {
        console.table(results);
    const update = await inquirer.prompt([
        {
            type: "input",
            message: "Please enter the id of the employee you would like to update.",
            name: "employee_update"
        },
        {
            type: "input",
            message: "Please enter the id of the employee's updated role.",
            name: "role_update"
        }
    ])
        db.query(
            `UPDATE employee SET role_id = ${update.role_update} WHERE id = ${update.employee_update};`,
        function () {
            console.log(`${update.employee_update} has been updated in the database.`);
        });
        start();
    });  
};

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