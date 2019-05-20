var mysql = require('mysql');
const keys = require('./keys');

var connection = mysql.createConnection({
    host: keys.sqlKeys.host,
    user: keys.sqlKeys.user,
    password: keys.sqlKeys.pass,
    database: keys.sqlKeys.db
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting: ', err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;