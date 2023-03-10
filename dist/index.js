"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const connection = require("./database/database");
const jwt = require("jsonwebtoken");
const PORT = 3000;
// Controllers
const usersControllers = require("./controllers/UsersController");
const articlesControllers = require("./controllers/ArticlesController");
const commentsControllers = require("./controllers/CommentsController");
const categoriesControllers = require("./controllers/CategoriesController");
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
connection
    .authenticate()
    .then(() => {
    console.log("DataBase connected succesfully");
})
    .catch((error) => {
    console.log(error);
});
app.use("/", usersControllers);
app.use("/", articlesControllers);
app.use("/", commentsControllers);
app.use("/", categoriesControllers);
app.get("/", function (req, res) {
    res.send("Hello, World!");
});
app.listen(PORT, () => console.log("Server started"));
