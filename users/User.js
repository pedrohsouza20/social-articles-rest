const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
});

User.sync({ force: false }).then(() => { });

module.exports = User;