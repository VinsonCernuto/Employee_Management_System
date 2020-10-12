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
    password: 'root',
    database: 'traker_db'
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
});