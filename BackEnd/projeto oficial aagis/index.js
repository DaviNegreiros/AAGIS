const express = require('express')
const app = express() //npm i express
const handlebars = require('express-handlebars') //npm i express-handlebars
const bodyParser = require('body-parser') //npm i body-parser
const Post = require('./models/Post')
const Usuario = require('./models/Usuario')
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
app.use('/upload', express.static(path.join(__dirname, 'upload')));


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

    try {
        // Buscar todos os posts ordenados do mais recente para o mais antigo
        const posts = await Post.findAll({
            order: [['id', 'DESC']],
            limit: 12
        });

        // Dividir os posts entre os que vao para os sliders e os que vao para os cards
        const postsSlider = posts.slice(0, 4);  // 4 primeiros posts (ordem decrescente)
        const postsCard = posts.slice(4);  // Restante dos posts
        // Defina o caminho para o arquivo CSS


        // Adicionando 1 ao índice de cada post
        const postsCardWithIndex = postsCard.map((post, index) => {
            post.indexPlusOne = index + 1;
            return post;
        });

        // Renderizar a página
        res.render('index', { postsSlider: postsSlider, postsCard: postsCardWithIndex, style: 'styles.css' });

    } catch (error) {
        // Capturando qualquer erro que ocorra durante a consulta ao banco de dados
        res.send("Erro ao buscar posts: " + error);
    }
});



//rota login
app.get('/login', function (req, res) {
    res.render('pag-login', { style: 'styleLogin.css' })
})

app.post('/cadastro', async (req, res) => {
    const email = req.body.emailCadastro
    const nome = req.body.nomeCadastro
    const BDnome = await Usuario.findOne({ where: { email: email } });
    const BDemail = await Usuario.findOne({ where: { nome: nome } });

    console.log("checando se existe nome de usuario ou email já existe")
    if (!BDnome && !BDemail) {
        console.log("nome e email ok")
        Usuario.create({
            nome: req.body.nomeCadastro,
            email: req.body.emailCadastro,
            senha: req.body.senhaCadastro
        }).then(function () {
            res.redirect('/');
        }).catch(function (erro) {
            res.redirect('/login?message=Houve um erro: ' + erro);
        })
    } else {
        console.log('nome ou email já existentes')
        res.redirect('login')
    }
})

app.post('/addlogin', async (req, res) => {
    console.log('Requisição recebida no /addlogin'); // Log adicional
    const email = req.body.email;
    const senha = req.body.senha;

    try {
        console.log(`Tentativa de login com email: ${email}`); // Log adicional para email

        const usuario = await Usuario.findOne({ where: { email: email } }); // Verificação de existência do usuário

        if (usuario) {
            console.log('Usuário encontrado:', usuario);
            if (senha === usuario.senha) {
                console.log("Senha correta, redirecionando...");
                res.redirect('/');
            } else {
                console.log("Senha incorreta");
                res.redirect('/login?message=Credenciais inválidas');
            }
        } else {
            console.log("Usuário não encontrado");
            res.redirect('/login?message=Credenciais inválidas');
        }
    } catch (error) {
        console.log("Erro ao tentar fazer login:", error);
        res.redirect('/login?message=Erro ao tentar fazer login');
    }
});


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
        res.redirect('/')
    }).catch(function (erro) {
        // Se houver algum erro, retorna uma mensagem de erro
        res.send('Ocorreu um erro: ' + erro)
    })
})

app.listen(6969, function () {
    console.log("Server on: http://localhost:6969")
})