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

