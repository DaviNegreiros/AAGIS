const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require('body-parser')
const Post = require("./models/Post")
const path = require('path');
const fileupload = require('express-fileupload')//npm i express-fileupload


app.use(express.static('views'))

//Config
//Template Engine
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,

        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', 'handlebars')

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rotas
app.get('/', function (req, res) {
    Post.findAll({
        order: [['id', 'DESC']], //ordenando por id, do maior para o menor
    }).then(function (posts) {
        // Adicionando 1 ao índice de cada post
        const postsWithIndex = posts.map((post, index) => {
            post.indexPlusOne = index + 1;
            return post;
        })
        res.render('frontaagis', { posts: posts })//printando os posts na tela
    })
})
//rota em que aparecera somente as noticias onde o curso = engsoftware
app.get('/software', function (req, res) {
    Post.findAll({
        where: {
            curso: "EngSoftware"
        },
        order: [['id', 'DESC']]
    }).then(function (posts) {
        //Mostra a página principal com os posts filtrados
        res.render('home', { posts: posts })
    }).catch(function (erro) {
        res.render('Ocorreu um erro: ' + erro)
    })
})

//rota em que aparecera somente as noticias onde o curso = engsaeroespacial
app.get('/aeroespacial', function (req, res) {
    Post.findAll({
        where: {
            curso: "EngAeroespacial"
        },
        order: [['id', 'DESC']]
    }).then(function (posts) {
        //Mostra a página principal com os posts filtrados
        res.render('home', { posts: posts })
    }).catch(function (erro) {
        res.render('Ocorreu um erro: ' + erro)
    })
})

//rota em que aparecera somente as noticias onde o curso = engautomotiva
app.get('/automotiva', function (req, res) {
    Post.findAll({
        where: {
            curso: "EngAutomotiva"
        },
        order: [['id', 'DESC']]
    }).then(function (posts) {
        //Mostra a página principal com os posts filtrados
        res.render('home', { posts: posts })
    }).catch(function (erro) {
        res.render('Ocorreu um erro: ' + erro)
    })
})

//rota em que aparecera somente as noticias onde o curso = engeletronica
app.get('/eletronica', function (req, res) {
    Post.findAll({
        where: {
            curso: "EngEletronica"
        },
        order: [['id', 'DESC']]
    }).then(function (posts) {
        //Mostra a página principal com os posts filtrados
        res.render('home', { posts: posts })
    }).catch(function (erro) {
        res.render('Ocorreu um erro: ' + erro)
    })
})

//rota em que aparecera somente as noticias onde o curso = engenergia
app.get('/energia', function (req, res) {
    Post.findAll({
        where: {
            curso: "EngEnergia"
        },
        order: [['id', 'DESC']]
    }).then(function (posts) {
        //Mostra a página principal com os posts filtrados
        res.render('home', { posts: posts })
    }).catch(function (erro) {
        res.render('Ocorreu um erro: ' + erro)
    })
})

//rota em que aparecera somente as noticias onde o curso = engenharias
app.get('/engenharias', function (req, res) {
    Post.findAll({
        where: {
            curso: "Engenharias"
        },
        order: [['id', 'DESC']]
    }).then(function (posts) {
        //Mostra a página principal com os posts filtrados
        res.render('home', { posts: posts })
    }).catch(function (erro) {
        res.render('Ocorreu um erro: ' + erro)
    })
})

app.get("/post", function (req, res) {
    res.render('formulario')
})

app.post('/add', function (req, res) {

    const titulo = req.body.titulopost
    const conteudo = req.body.conteudopost
    const curso = req.body.curso
    const idconta = req.body.idconta
    const ref_imagem = req.file ? req.file.path : null //verifica se uma imagem foi enviada

    Post.create({
        titulopost: titulo,
        conteudopost: conteudo,
        curso: curso,
        idconta: idconta,
        ref_imagem: ref_imagem
    }).then(function () {
        res.redirect('/')
    }).catch(function (erro) {
        res.send("Ocorreu um erro: " + erro)
    })
})

/*posivelmente aqui colocaremos que para deletar o post
o id da pessoa que criou o post deve ser o mesmo da pessoa
que esta tentando deletar o post*/
app.get('/deletar/:id', function (req, res) {
    Post.destroy({ where: { 'id': req.params.id } }).then(function () {
        res.send("Post excluído com sucesso!")
    }).catch(function (erro) {
        res.send("Esta postagem não existe ")
    })
})


app.listen(7071, function () {
    console.log("Server on: http://localhost:7071")
})
