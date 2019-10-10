const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

const dbConnection = require('./database/connect');

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    dbConnection.query('SELECT * FROM test_table;', (error, results) => {
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            res.send(results);
        }
    });
});

app.post('/new/:name1/:name2', (req, res) => {
    let name1 = req.params.name1;
    let name2 = req.params.name2;
    let query = 'INSERT INTO test_table (name1, name2) VALUES (?, ?);';
    dbConnection.query({
        sql: query,
        values: [name1, name2]
    }, error => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    })
});

app.post('/delete/:id', (req, res) => {
    console.log("Hit id delete");
   let query = 'DELETE FROM test_table WHERE id = ?;';
    dbConnection.query({
        sql: query,
        values: [req.params.id]
    }, error => {
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});
