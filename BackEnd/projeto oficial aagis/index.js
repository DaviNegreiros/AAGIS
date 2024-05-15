const express = require('express')
const app = express() //npm i express
const handlebars = require('express-handlebars') //npm i express-handlebars
const bodyParser = require('body-parser') //npm i body-parser
const Post = require('./models/Post')
const path = require('path') //npm i path
const fileUpload = require('express-fileupload') //npm i express-fileupload
const fs = require('fs')
//npm install mysql2

//default option
app.use(fileUpload())
//app.use(express.static('views'))

//static files
app.use(express.static('upload'))
app.use(express.static('public'))

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
//rota home
app.get('/home', function (req, res) {

    // Defina o caminho para o arquivo CSS
    const cssPath = './views/styles.css'

    Post.findAll({
        order: [['id', 'DESC']],//ordenando as noticias por id do maior para o menor
    }).then(function (posts) {
        // Adicionando 1 ao índice de cada post
        const postsWithIndex = posts.map((post, index) => {
            post.indexPlusOne = index + 1;
            return post;
        })
        res.render('index', { posts: posts, style: 'styles.css' })
    })
})


//rota login
app.get('/login', function (req, res) {
    res.render('pag-login', { style: 'styleLogin.css' })
})


//rota post
app.get('/post', function (req, res) {
    res.render('pag-post', { style: 'style-post.css' })
})
//rota para postar a noticia
app.post('/add', function (req, res) {

    const titulo = req.body.titulopost
    const subtitulo = req.body.subtitulopost
    const conteudo = req.body.conteudopost

    Post.create({
        titulopost: titulo,
        subtitulopost: subtitulo,
        conteudopost: conteudo
    }).then(function () {
        res.redirect('/home')
    }).catch(function (erro) {
        res.send('Ocorreu um erro: ' + erro)
    })
})

app.listen(7071, function () {
    console.log("Server on: http://localhost:7071")
})