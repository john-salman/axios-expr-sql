const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

const dbConnection = require('./database/connect');

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    dbConnection.query('CALL getAll();', (error, results) => {
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            res.send(results[0]);
        }
    });
});

app.post('/new/:name1/:name2', (req, res) => {
    let name1 = req.params.name1;
    let name2 = req.params.name2;
    let query = 'CALL testInsert(?, ?);';
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
    let id = req.params.id;
    let query = 'CALL testDelete(?);';
    dbConnection.query({
        sql: query,
        values: [id]
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
