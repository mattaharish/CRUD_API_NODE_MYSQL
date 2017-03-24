var mysql = require('mysql');

var connection = mysql.createConnection({
host : "localhost",
user : "root",
password : "matta",
database : "node"
});

module.exports = connection;