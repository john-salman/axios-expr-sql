const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20FrANK$sP0NG3GaR02',
    database: 'test'
});

module.exports = connection;