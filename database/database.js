const Sequelize = require('sequelize');

const DB_NAME = 'rest-test';
const DB_USER = 'root';
const DB_PASSWORD = '19372855';

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;