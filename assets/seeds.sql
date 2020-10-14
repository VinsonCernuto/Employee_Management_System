USE traker_db;

INSERT INTO department (name) VALUES ("Sales");

INSERT INTO department (name) VALUES ("Web Development");

INSERT INTO department (name) VALUES ("Finance");

INSERT INTO department (name) VALUES ("Graphic Design");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Web Developer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Web Developer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Graphic Designer", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Vinson", "Cernuto", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Frank", "Adams", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Smith", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Smith", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Johnson", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Miller", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Geroge", "Wilson", 1, 2);

