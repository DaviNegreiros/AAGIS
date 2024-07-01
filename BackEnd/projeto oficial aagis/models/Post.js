const db = require('./db')

const Post = db.sequelize.define('postagens', {
    titulopost: {
        type: db.Sequelize.STRING
    },
    subtitulopost: {
        type: db.Sequelize.TEXT
    },
    conteudopost: {
        type: db.Sequelize.TEXT
    },
    curso: {
        type: db.Sequelize.STRING
    },
    ref_imagem: {
        type: db.Sequelize.STRING
    },
    data: { 
        type: db.Sequelize.STRING
    },
    hora: {
        type: db.Sequelize.STRING
    },
    autor: {
        type: db.Sequelize.STRING
    },
    foto_autor: {
        type: db.Sequelize.STRING
    }
})
//Post.sync({ force: true })


module.exports = Post
