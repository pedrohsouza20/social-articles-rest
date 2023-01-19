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
    category: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    edited: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    deslikes: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

User.sync({ force: false }).then(() => { });

module.exports = Article;