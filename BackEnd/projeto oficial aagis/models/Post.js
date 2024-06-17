const db = require('./db')

const Post = db.sequelize.define('postagens', {
    titulopost: {
        type: db.Sequelize.STRING
    },
    subtitulopost: {
        type: db.Sequelize.STRING
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
    idconta: {
        type: db.Sequelize.INTEGER
    }
})
// Post.sync({ force: true })


module.exports = Post
