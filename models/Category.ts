const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1,
  },
});

Category.sync({ force: false }).then(() => {});

module.exports = Category;

export {};
