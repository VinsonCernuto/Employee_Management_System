DROP DATABASE IF EXISTS traker_db;
CREATE database traker_db;

USE traker_db;

CREATE TABLE departments (
    dept_id INT NOT NUll Auto_INCREMENT,
    dept_name VARCHAR(120) NOT NULL,
    PRIMARY KEY (dept_id)
);

