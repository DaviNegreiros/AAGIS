const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    aprovado: {
        type: db.Sequelize.BOOLEAN
    },
    foto_perfil: {
        type: db.Sequelize.STRING
    }
})

//Usuario.sync({ force: true })

module.exports = Usuario