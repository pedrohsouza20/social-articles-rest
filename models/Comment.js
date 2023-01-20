const Sequelize = require("sequelize");
const connection = require("../database/database");

const Comment = connection.define("comments", {
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    articleId: {
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

Comment.sync({ force: false }).then(() => { });

module.exports = Comment;