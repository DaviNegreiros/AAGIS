const express = require('express')
const app = express() //npm i express
const handlebars = require('express-handlebars') //npm i express-handlebars
const bodyParser = require('body-parser') //npm i body-parser
const Post = require('./models/Post')
const Usuario = require('./models/Usuario')
const path = require('path') //npm i path
const fileUpload = require('express-fileupload') //npm i express-fileupload
const fs = require('fs')
const session = require('express-session');  //npm i express-session
//npm install mysql2

//default option
app.use(fileUpload())
//app.use(express.static('views'))

//static files
app.use(express.static('upload'))
app.use(express.static('public'))
app.use('/upload', express.static(path.join(__dirname, 'upload')));

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

// Configurar o middleware de sessão
app.use(session({
    secret: 'your_secret_key', // Substitua por uma chave secreta segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

function isLog(req, res, next) {
    if (req.session && req.session.user_name) {
        return next(); // O usuário está autenticado, continuar para a próxima middleware/rota
    } else {
        res.redirect('/login'); // O usuário não está autenticado, redirecionar para a página de login
    }
}

function isAdm(req, res, next) {
    if (req.session.user_email === 'aagisnoticias2024@gmail.com') {
        return next(); // Usuário está na conta de adm, seguir para rota
    } else {
        res.redirect('/?message=Acesso negado'); // Usuário não está na conta de adm, redirecionar para página inicial
    }
}


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
        if (req.session.user_name) {  // Verificar se o usuário está logado
            if (req.session.user_email === 'aagisnoticias2024@gmail.com'){  // Verficiar se usuário está na conta de ADM
                res.render('index', { postsSlider: postsSlider, postsCard: postsCardWithIndex,
                                      user_logado: true, user_adm: true,
                                      user_foto: req.session.user_foto, user_name: req.session.user_name, user_tipo: 'Adm',
                                      style: 'styles.css'});
            } else {
                res.render('index', { postsSlider: postsSlider, postsCard: postsCardWithIndex,
                                      user_logado: true,
                                      user_foto: req.session.user_foto, user_name: req.session.user_name, user_tipo: 'Professor',
                                      style: 'styles.css'});
            }

        } else {
            res.render('index', { postsSlider: postsSlider, postsCard: postsCardWithIndex, 
                                  user_logado: false,
                                  user_name: 'Usuário', user_tipo: 'Aluno', 
                                  style: 'styles.css'});
        }

    } catch (error) {
        // Capturando qualquer erro que ocorra durante a consulta ao banco de dados
        res.send("Erro ao buscar posts: " + error);
    }
    const data = {
        user_name: 'User' // Sua variável do arquivo index.js
      };
});

// Mensagens de erro
var us_repetido = false
var senha_incorreta = false 
var email_inexistente = false 
 
//rota login 
app.get('/login', function (req, res) {
    res.render('pag-login', { 
        us_repetido, email_inexistente, senha_incorreta,
        style: 'styleLogin.css',
        user_name: req.session.user_name
     }) 
})

app.post('/cadastro',  async (req, res) =>{
    const email = req.body.emailCadastro
    const nome = req.body.nomeCadastro
    const BDnome = await Usuario.findOne({ where: { email: email } });
    const BDemail = await Usuario.findOne({ where: { nome: nome } });
     
    console.log("checando se existe nome de usuario ou email já existe")
    if(!BDnome && !BDemail){
        console.log("nome e email ok")
        Usuario.create({
            nome: req.body.nomeCadastro,
            email: req.body.emailCadastro,
            senha: req.body.senhaCadastro,
            foto_perfil: "/upload/fotoperfil/profile_10693213.png",
            aprovado: false
        }).then(function() {
            res.redirect('/login?message=pedido enviado para analise');
        }).catch(function(erro) {
            res.redirect('/login?message=Houve um erro: ' + erro); 
        })
    } else {
        console.log('nome ou email já existentes')
        us_repetido = true
        res.redirect('/login')
    }
})

// Rota controle
app.get('/controle', isAdm, async (req, res) => {

        try {
            // Buscar todos usuarios nao aprovados 
            const usuarios_na = await Usuario.findAll({
                where: {
                    aprovado: false
                },
                order: [['id', 'DESC']],
            });

            // Renderizar a pagina
            res.render('pag-controle', {usuario: usuarios_na, style: 'style-painel.css'});

        } catch(err) {
            res.send("Erro ao buscar requisições " + err);
        }

});

// Aprovar usuário
app.get('/aprovar-usuario/:id', isAdm, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Usuario.update(
            { aprovado: true },
            { where: { id: id } }
        );
        
        if (result[0] === 1) {
            res.send('Usuário aprovado com sucesso!');
        } else {
            res.send('Usuário não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao aprovar usuário:', err);
        res.send('Ocorreu um erro ao aprovar o usuário.', err);
    }

});

// Deletar usuário recusado
app.delete('/deletar-usuario/:id', isAdm, async (req, res) => {
    try {
        const id = req.params.id;
        await Usuario.destroy({
            where: { id: id }
        });
        res.sendStatus(200); // Sucesso
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.sendStatus(500); // Erro no servidor
    }
});

app.post('/addlogin', async (req, res) => {
    console.log('Requisição recebida no /addlogin'); // Log adicional
    const email = req.body.email;
    const senha = req.body.senha;

    try {
        console.log(`Tentativa de login com email: ${email}`); // Log adicional para email

        const usuario = await Usuario.findOne({ where: { email: email } }); // Verificação de existência do usuário

        if (usuario) {
            console.log('Usuário encontrado:', usuario, '\nStatus:', usuario.aprovado);
            if (usuario.aprovado === true) {
                if (senha === usuario.senha) {
                    console.log("Senha correta, redirecionando...");
                    req.session.user_name = usuario.nome; // Armazenar nome do usuário na sessão
                    req.session.user_email = usuario.email;
                    req.session.user_foto = usuario.foto_perfil;

                    res.redirect('/');
                } else {
                    senha_incorreta = true
                    console.log("Senha incorreta");
                    res.redirect('/login?message=Credenciais inválidas');
                }
            } else {
                console.log("Usuário não aprovado");
                res.redirect('/login?message=Usuário em análise');
            }
        } else {
            email_inexistente = true
            console.log("Usuário não encontrado");
            res.redirect('/login?message=Credenciais inválidas');
        }
    } catch (error) {
        console.log("Erro ao tentar fazer login:", error);
        res.redirect('/login?message=Erro ao tentar fazer login');
    }
});

// Rota botão logout
app.get('/logout', (req, res) => {
    if (req.session.user_name) {
        req.session.destroy(err => {
            if (err) {
                console.log("Erro ao tentar fazer logout:", err);
                return res.redirect('/?message=Erro ao tentar fazer logout');
            }
            res.redirect('/');
        });
    } else {
        res.redirect('/l?message=Nenhum usuário logado');
    }
});

// Rota perfil
app.get('/perfil', isLog, async(req, res) => {

    const email = req.session.user_email;

    const usuario = await Usuario.findOne({ where: { email: email} })

    res.render('pag-perfil', {
            usuario: usuario,    
            style: 'style-post.css'});
});

// Rota atualizar perfil
app.post('/attperfil/:id', isLog, async(req, res) => {
    const id = req.params.id;
    const usuario = await Usuario.findOne({where: {id: id}})

    // Extrair dados do formulário
    var nomeUsuario = req.body.nomeUsuario;
    var email = req.body.email;

    // Caso usuário não atualize o nome ou email
    if(!req.body.nomeUsuario) { nomeUsuario = usuario.nome; }
    if(!req.body.email) { email = usuario.email; }
    
    
    if (!req.files || !req.files.picture__input) {
        res.send("Por favor selecione uma foto de perfil");
        
    }
        
    const foto_perfil = req.files.picture__input; // Nome do input é picture__input
    
    const uploadDir = path.join(__dirname, 'upload', 'fotoperfil'); // Diretório de upload
    

    // Verifica se o diretório de upload existe, se não, cria o diretório
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Define o caminho completo do arquivo de upload
    const uploadPath = path.join(uploadDir, foto_perfil.name);

    // Move o arquivo para o diretório de upload que foi selecionado acima
    foto_perfil.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        // Atualizar dados do usuário
        Usuario.update(
            {
                nome: nomeUsuario,
                email: email,
                foto_perfil: path.join('/upload/fotoperfil', foto_perfil.name)
            },
            { where: { id: id } }
        ).then(() => {
            // Armazenar dados do usuário na sessão
            req.session.user_name = nomeUsuario;
            req.session.user_email = email;
            req.session.user_foto = path.join('/upload/fotoperfil', foto_perfil.name);

            // Redireciona para a página inicial
            res.redirect('/');
        }).catch((erro) => {
            // Se houver algum erro, retorna uma mensagem de erro
            res.status(500).send('Ocorreu um erro: ' + erro);
        });
    });
});

//rota post
app.get('/post', isLog, function (req, res) {
    res.render('pag-post', { style: 'style-post.css' });
});

//Rota para postar a noticia
app.post('/add',isLog, function (req, res) {

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
});

// Rota painel
app.get('/painel', isAdm, async(req, res) => {
        try{
            const noticias = await Post.findAll({
                order: [['id', 'DESC']]
            })

            res.render('pag-painel', {noticia: noticias, style: 'style-painel.css'});
        } catch(err) {
            res.send("Erro ao buscar notícias:", err);
        }

});

// Rota para deletar noticia no painel
app.delete('/excluir-noticia/:id', isAdm, async(req, res) => {
    try {
        const id = req.params.id;
        await Post.destroy({
            where: { id: id }
        });
        res.sendStatus(200); // Sucesso
    } catch (error) {
        console.error('Erro ao excluir noticia:', error);
        res.sendStatus(500); // Erro no servidor
    }

});

// Rota para editar notícia
app.get('/editar-noticia/:id', isAdm, async(req, res) => {
    try {
        const id = req.params.id;
        const noticia = await Post.findOne({
            where: {
                id: id
            }
        })
 
        res.render('pag-editarNoticia', {noticia: noticia, style: 'style-post.css'});
    } catch(err) {
        res.send("Erro:", err);
    }

});

// rota para atualizar noticia no banco
app.post('/attnoticia/:id', isAdm, async(req, res) => {
    const id = req.params.id;
    const noticia = await Post.findOne({where: {id: id}})

    // Extrair dados do formulário
    var titulo = req.body.titulopost;
    var subtitulo = req.body.subtitulopost;
    var conteudo = req.body.conteudopost;
    var foto_noticia_temp = req.files.picture__input;
    var foto_noticia;

    // Caso usuário não atualize algum dado
    if(!req.body.titulopost) { titulo = noticia.titulopost; }
    if(!req.body.subtitulopost) { subtitulo = noticia.subtitulopost; }
    if(!req.body.conteudopost) { conteudo = noticia.conteudopost; }
        
    if(req.files.picture__input) {
        const uploadDir = path.join(__dirname, 'upload'); // Diretório de upload
        

        // Verifica se o diretório de upload existe, se não, cria o diretório
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Define o caminho completo do arquivo de upload
        const uploadPath = path.join(uploadDir, foto_noticia_temp.name);
    
    
        // Move o arquivo para o diretório de upload que foi selecionado acima
        foto_noticia_temp.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err)

        });

        foto_noticia = path.join('/upload', foto_noticia_temp.name).replace(/\\/g, '/');

    } else { foto_noticia = noticia.ref_imagem; }

    // Atualizar dados do usuário
    Post.update(
        {
            titulopost: titulo,
            subtitulopost: subtitulo,
            conteudopost: conteudo,
            ref_imagem: foto_noticia
        },
        { where: { id: id } }
    ).then(() => {
        // Redireciona para o painel
        res.redirect('/painel');
    }).catch((erro) => {
        // Se houver algum erro, retorna uma mensagem de erro
        res.status(500).send('Ocorreu um erro: ' + erro);
    });
});


app.listen(6969, function () {
    console.log("Server on: http://localhost:6969")
});