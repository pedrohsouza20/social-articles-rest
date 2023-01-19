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
const Article = require('./models/Article');
const Comment = require('./models/Comment');

// Controllers
const usersControllers = require('./controllers/UsersController');
const articlesControllers = require('./controllers/ArticlesController');
const commentsControllers = require('./controllers/CommentsController');

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
app.use("/", articlesControllers);
app.use("/", commentsControllers);

app.get('/', function (req, res) {
    res.send('Hello, World!');
});


app.listen(PORT, () => console.log('Server started'));