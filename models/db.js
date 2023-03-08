//Conexão com o banco de dados mariadb
const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog', 'root', '', {
    host: "localhost",
    dialect: 'mariadb'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};