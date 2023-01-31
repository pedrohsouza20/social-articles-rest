const Sequelize = require("sequelize");
const connection = require("../database/database");

const Article = connection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    edited: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    unlikes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

Article.sync({ force: false }).then(() => { });

module.exports = Article;

export { }