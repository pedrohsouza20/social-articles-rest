const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    userName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
});

User.sync({ force: false }).then(() => { });

module.exports = User;