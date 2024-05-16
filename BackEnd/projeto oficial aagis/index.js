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
//Rota para postar a noticia
app.post('/add', function (req, res) {

    let uploadPath// Caminho onde o arquivo será enviado
    let sampleFile// Variável para armazenar o arquivo enviado

    // Verificar se alguma imagem foi enviado
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Por favor, adicione uma imagem à notícia. Nenhuma imagem foi enviada.')
    }

    // Extrair dados do formulário
    const titulo = req.body.titulopost// Título da notícia
    const subtitulo = req.body.subtitulopost// Subtítulo da notícia
    const conteudo = req.body.conteudopost// Conteúdo da notícia
    const ref_imagem = req.files.picture__input//nome do input é picture__input
    const uploadDir = path.join(__dirname, '/upload')// Diretório de upload

    // Verifica se o diretório de upload existe, se não, cria o diretório
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    // Define o caminho completo do arquivo de upload
    uploadPath = __dirname + '/upload/' + ref_imagem.name

    // Move o arquivo para o diretório de upload que foi selecionado acima
    ref_imagem.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err)

    })

    // Criação do post no banco de dados
    Post.create({
        titulopost: titulo,
        subtitulopost: subtitulo,
        conteudopost: conteudo,
        ref_imagem: '/upload/' + ref_imagem.name // Caminho completo da imagem
    }).then(function () {
        // Redireciona para a página inicial após a criação do post
        res.redirect('/home')
    }).catch(function (erro) {
        // Se houver algum erro, retorna uma mensagem de erro
        res.send('Ocorreu um erro: ' + erro)
    })
})

app.listen(7071, function () {
    console.log("Server on: http://localhost:7071")
})