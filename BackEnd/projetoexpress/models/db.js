// Arquivo apenas para se conectar ao banco de dados
//Conexão com o BD MySQL
const Sequelize = require('sequelize')
const sequelize = new Sequelize('aagis3', 'root', '2912', {
    host: "localhost",
    dialect: 'mysql'
})
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}