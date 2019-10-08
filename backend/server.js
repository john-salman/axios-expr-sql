const app = require('express')();
const mysql = require('mysql');
const port = 3001;

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});
app.get('/test', (req, res) => {

    connection.connect();

    connection.query('SELECT * FROM test_table;', function (error, results, fields) {
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            console.log('The result is: ', results);
            res.send(results[0]);
        }
    });

    connection.end();
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});
