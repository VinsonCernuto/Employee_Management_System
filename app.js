const inquirer = require('inquirer');
const mysql = require('mysql');
require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',

    //Your Port
    port: 3306,

    //Your username
    username: 'root',

    //Your password
    password: 'Tank.1996',
    database: 'traker_db'
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
});

const questions = [
    {
        name: "startingQuestion",
        type: "list",
        message: "What Would you like to do?",
        choices: [
            "Add departments",
            "Add roles",
            "Add employees",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles",
            "Close Program"
        ]
    },
    {
        name: "departmentName",
        type: "input",
        message: "What is the depatment's name?"
    }
];

// Functions for application
function runProgram() {
    inquirer.prompt(questions[0]).then(function(res){
        switch(res.startingQuestion){
            case "Add departments":
                addDepartments();
                break;
            case "Add roles":
                addRoles();
                break;
            case "View departments":
                viewDepartment();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Update employee roles":
                updateEmployeeRoles();
                break;
            case "Close program":
                connection.end();
        }   
    });
}

function addDepartments() {
    inquirer.prompt(questions[1]).then(function(res){
        let name = res.departmentName;
        let query = "INSERT INTO department SET ?";
        connection.query(query, { dept_name },function(err){
            if (err) throw err;
            runProgram();
        });
    });
}

function viewDepartment() {
    let query = "SELECT * from departments";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log("\nHere are the depatments\n\n================================\n");
        console.table(res);
        console.log("================================\n");
        runProgram();
    });
}

function addRoles() {
    let query = "SELECT * from departments";
    connection.query(query, function(err, departmentTable) {
        if (err) throw err;
        let allDepartments = [];

        departmentTable.forEach(department => {
            allDepartments.push(department.dept_name);
        });

        const rolesQuestion = [
            { 
                name: "selectDpt",
                type: "list",
                message: "Which department would you like to add the role to?",
                choices: allDepartments
            },
            {
                name: "roleTitle",
                type: "input",
                message: "Whats the role title"
            },
            {
                name: "rolePay",
                type: "input",
                message: "What does the position pay?"
            }
        ];

        inquirer.prompt(rolesQuestion).then(function(fullResult){
            let dept_id = "";
            let title = fullResult.roleTitle;
            let salary = fullResult.roleSalary;

            for (let i = 0; i < allDepartments.length; i++) {
                if (fullResult.whichDpt === departmentTable[i].dept_name) {
                    dept_id = departmentTable[i].dept_id;
                }
            }

            connection.query(
                "INSERT INTO roles SET ?",
                { title: title, salary: salary, dept_id: deptid},
                function(err) {
                    if (err) throw err;
                    runProgram();
                }
            ); 
        });
    });
}

function viewEmployees() {
    let query = "SELECT employee.employee_id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.dept_name FROM employee INNER JOIN roles ON (employee.roles_id = roles.roles_id) INNER JOIN departments ON (roles.dept_id = departments.dept_id)";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log("\nHere are all employees\n\n==============\n");
        console.table(res);
        console.log("\n==============\n");
        runProgram();
    });
}

function updateEmployeeRoles() {
    let query = "SELECT * from roles";
    connection.query(query, function(err, rolesTable){
        if (err) throw err;
        let allRoles = [];
        rolesTable.forEach(role => {
            allRoles.push(role.title);
        });
        const updateQuestions = [
        //questions for add roles
            {
                name: 'whichRole',
                type: 'list',
                message: 'Which role do you want to update?',
                choices: 'allRoles'
            },
            { 
                name: 'whichUpdate',
                type: 'list',
                message: 'What would you like to update?',
                choices: ['Salary', 'Title']
            }   
        ];
        inquirer.prompt(updaeQuestions).then(function(role){
            let roleID;
            for (let i = 0; i < allRoles.length; i++) {
                if (role.whichRole === rolesTable[i].title){
                    roleID = rolesTable[i].roles_id;
                }
            }

            if (role.whichUpdate === 'salary') {
                inquirer.prompt({
                    name: 'newSalary',
                    type: 'input',
                    message: 'Enter new salary'
                }).then(function(response) {
                    let newSalary = parseInt(newSalary);

                    let query = "UPDATE Roles SET ? WHERE roles_id = ${roleID}";
                    connection.query(query, { salary: newSalary }, function(err){
                        if (err) throw err;
                        runProgram();
                    });
                });
            } else {
                inquirer.prompt({
                    name: 'newTitle',
                    type: 'input',
                    message: 'Enter new title'
                }).then(function(response) {
                    let newTitle = response.newTitle;
                    let query = 'UPDATE Roles SET ? WHERE roles_id = ${roleID}';
                    connection.query(query, { title: newTitle }, function(err){
                        if (err) throw err;
                        runProgram();
                    });
                });
            }
        });
    });
}

runProgram();