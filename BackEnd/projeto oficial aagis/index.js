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
//rota pagina inicial
app.get('/', async (req, res) => {

    // Criar nova noticia para teste:
    /*const novoPost = await Post.create({
          titulopost: "Noticia 21",
          subtitulopost: "Subtitulo da noticia 21", 
          conteudopost: "Conteudo da noticia",
          curso: "Eng Software",
          ref_imagem: "/imagens/noticia1.jpeg",
          id_conta: 0
      });*/

    try {
        // Buscar todos os posts ordenados do mais recente para o mais antigo
        const posts = await Post.findAll({
            order: [['id', 'DESC']],
            limit: 12
        });

        // Dividir os posts entre os que vao para os sliders e os que vao para os cards
        const postsSlider = posts.slice(0, 4);  // 4 primeiros posts (ordem decrescente)
        const postsCard = posts.slice(4);  // Restante dos posts

        // Adicionando 1 ao índice de cada post
        const postsCardWithIndex = postsCard.map((post, index) => {
            post.indexPlusOne = index + 1;
            return post;
        });

        // Renderizar a página
        res.render('index', { postsSlider: postsSlider, postsCard: postsCardWithIndex, style: 'styles.css'});

    } catch (error) {
        // Capturando qualquer erro que ocorra durante a consulta ao banco de dados
        res.send("Erro ao buscar posts: " + error);
    }
});

 

//rota login
app.get('/login', function (req, res) {
    res.render('pag-login', { style: 'styleLogin.css' }) 
})


//rota post
app.get('/post', function (req, res) {
    res.render('pag-post', { style: 'style-post.css' })
})

app.listen(7071, function () {
    console.log("Server on: http://localhost:7071")
})