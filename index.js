const express = require('express');
const app = express();

const connection = require('./database/database');
const PORT = 3000;

const { Sequelize, DataTypes, Model } = require('sequelize');

// Models
const User = require('./users/User');

// Controllers
const usersControllers = require('./users/UsersController');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connection.authenticate().then(() => console.log("DataBase connected succesfully")).catch(error => console.log(error))


/*async function testConnection() {
    try {
        await connection.authenticate();
        console.log('conectado');
    }
    catch (error) {
        console.error('Baianagem detected', error);
    }
}*/

//testConnection();

app.use("/", usersControllers);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello worldSS');
});

app.get('/teste', function (req, res) {
    res.json({
        "statusCode": 401,
        "message": "unauthorized"
    });
});

app.listen(PORT);