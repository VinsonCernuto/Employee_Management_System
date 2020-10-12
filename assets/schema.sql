DROP DATABASE IF EXISTS traker_db;
CREATE database traker_db;

USE traker_db;

CREATE TABLE departments (
    dept_id INT NOT NUll Auto_INCREMENT,
    dept_name VARCHAR(120) NOT NULL,
    PRIMARY KEY (dept_id)
);

CREATE TABLE roles (
    roles_is INT NOT NULL Auto_INCREMENT,
    title VARCHAR(120) NOT NULL,
    salary VARCHAR(120) NOT NULL,
    dept_id INT NOT NUll,
    PRIMARY KEY (roles_id),
    FOREIGN KEY (dept_id),
    REFERENCES departments(dept_id)
);

