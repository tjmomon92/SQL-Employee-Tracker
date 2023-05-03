INSERT INTO department (id, name)
VALUES 
    (001, "Research and Development"),
    (002, "Human Resources"),
    (003, "Legal and Finance"),
    (004, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES  
    (001, "Lead Developer", 100000, 001),
    (002, "Manufacturing Engineer", 75000, 001),
    (003, "Process Engineer", 75000, 001),
    (004, "Legal Team Manager", 80000, 003),
    (005, "Sales Manager", 90000, 004),
    (006, "Sales", 70000, 004),
    (007, "Accountant Manager", 100000, 003),
    (008, "Accountant", 80000, 003);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (001, "Bob", "White", 001, 001),
    (002, "Amrit", "Patel", 002, 001),
    (003, "Carl", "Ross", 003, 001),
    (004, "Cam", "Anderson", 004, 004),
    (005, "Maxwell", "Smith", 005, 005),
    (006, "Ashley", "Graham", 006, 005),
    (007, "Tammy", "Tidwell", 007, 004),
    (008, "Stuart", "Momon", 008, 007);
