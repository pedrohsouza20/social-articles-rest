const express = require('express');
const app = express();

const session = require('express-session');
const connection = require('./database/database');
const PORT = 3000;

app.use(session({
    secret: 'CHAVESEGREDO', cookie: { maxAge: 30000 }
}))

// Models
const User = require('./models/User');

// Controllers
const usersControllers = require('./controllers/UsersController');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connection.authenticate().
    then(() => {
        console.log("DataBase connected succesfully");
    })
    .catch(error => {
        console.log(error);
    })

app.use("/", usersControllers);

app.get('/', function (req, res) {
    res.send('Hello, World!');
});


app.listen(PORT, () => console.log('Server started'));