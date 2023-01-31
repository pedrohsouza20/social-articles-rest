import express, { Request, Response } from "express";

const app = express();

const connection = require('./database/database');
const jwt = require('jsonwebtoken');
const PORT = 3000;

// Controllers
const usersControllers = require('./controllers/UsersController');
const articlesControllers = require('./controllers/ArticlesController');
const commentsControllers = require('./controllers/CommentsController');
const categoriesControllers = require('./controllers/CategoriesController');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connection.authenticate().
    then(() => {
        console.log("DataBase connected succesfully");
    })
    .catch((error: Error) => {
        console.log(error);
    })

app.use("/", usersControllers);
app.use("/", articlesControllers);
app.use("/", commentsControllers);
app.use("/", categoriesControllers);


app.get('/', function (req: Request, res: Response) {
    res.send('Hello, World!');
});


app.listen(PORT, () => console.log('Server started'));

export { }