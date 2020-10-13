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