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
    (004, "Development Manager", 80000, 001),
    (005, "Sales Manager", 90000, 002),
    (006, "Sales", 70000, 002),
    (007, "Accountant Manager", 100000, 003),
    (008, "Accountant", 80000, 003),
    (009, "Legal Team Manager", 200000, 004),
    (010, "CEO", 250000, 004);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (001, "Bob", "White", 004, 001),
    (002, "Carl", "Ross", 002, 001),
    (003, "Cam", "Anderson", 009, 003),
    (004, "Maxwell", "Smith", 010, 003),
    (005, "Amrit", "Patel", 005, 005),
    (006, "Darius", "Sanders", 006, 005),
    (007, "Tammy", "Tidwell", 007, 007),
    (008, "Ashley", "Graham", 008, 007),
    (009, "Stuart", "Momon", 001, 010),
    (010, "Marissa", "Brown", 003, 001);