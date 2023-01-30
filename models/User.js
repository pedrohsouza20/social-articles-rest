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
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
        allowNull: false
    },
    accountType: {
        type: Sequelize.STRING,
        defaultValue: 'common',
        allowNull: false
    }
});

User.sync({ force: false }).then(() => { });

module.exports = User;