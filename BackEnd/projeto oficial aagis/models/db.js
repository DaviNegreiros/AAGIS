// Arquivo apenas para se conectar ao banco de dados
//Conexão com o BD MySQL
//Model definition
const Sequelize = require('sequelize')  // npm i sequelize
const sequelize = new Sequelize('aagis3', 'root', 'yasmin@0102', {
    host: "localhost",
    dialect: 'mysql'
})
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}