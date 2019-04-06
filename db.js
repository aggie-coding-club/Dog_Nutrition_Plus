var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'data'
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting: ', err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;