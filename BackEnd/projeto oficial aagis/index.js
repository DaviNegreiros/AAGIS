const express = require('express')
const app = express() //npm i express
const handlebars = require('express-handlebars') //npm i express-handlebars
const bodyParser = require('body-parser') //npm i body-parser
const Post = require('./models/Post')
const Usuario = require('./models/Usuario')
const path = require('path') //npm i path
const fileUpload = require('express-fileupload') //npm i express-fileupload
const fs = require('fs');
const session = require('express-session');  //npm i express-session
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');  //npm i bcrypt
const say = require('say');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');  //npm i @google/generative-ai dotenv
dotenv.config();

const saltRounds = 11;  // Nível de segurança do processo de hashing para senha do usuário (maior nível = maior custo de processamento)
const genAI = new GoogleGenerativeAI(process.env.API_KEY); 


//npm install mysql2

//default option
app.use(fileUpload()) 
//app.use(express.static('views'))

//static files
app.use(express.static('upload'))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/upload', express.static(path.join(__dirname, 'upload')));

//Config

//Template Engine
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');


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

// Função para enviar arquivos para a IA
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        }
    };
}


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
function sanitizeFileName(fileName) {
    let sanitizedFileName = '';
    // Percorre cada caractere do nome do arquivo
    for (let i = 0; i < fileName.length; i++) {
        // Se o caractere atual for um espaço, adiciona um sublinhado ao resultado
        if (fileName[i] === ' ') {
            sanitizedFileName += '_';
        } else {
            // Caso contrário, adiciona o caractere original ao resultado
            sanitizedFileName += fileName[i];
        }
    }
    return sanitizedFileName;
}

function removerAcento(text) {
    text = text.replaceAll('é', 'e')
                    .replaceAll('á', 'a')
                    .replaceAll('í', 'i')
                    .replaceAll('ó', 'o')
                    .replaceAll('ú', 'u')
                    .replaceAll('à', 'a')
                    .replaceAll('ã', 'a')
                    .replaceAll('õ', 'o')
                    .replaceAll('â', 'a')
                    .replaceAll('ê', 'e')
                    .replaceAll('ç', 'ss')
                    .replaceAll('Á', 'A')
                    .replaceAll('Ú', 'U')
                    .replaceAll('É', 'E');

    return text;
}

// Helper para verificar se um valor está presente em um array
const Handlebars = require('handlebars');
Handlebars.registerHelper('includes', function (array, value, options) {
    return (array && array.includes(value)) ? options.fn(this) : options.inverse(this);
});

// Simulação de dados de cursos selecionados inicialmente
let curso = ['Todos']; // 'Todos' selecionado por padrão

var us_repetido = false
var senha_incorreta = false
var email_inexistente = false
var user_criado = false
var mensagem_wait = false

//Rotas
// Rota da página inicial
app.get('/', async (req, res) => {
    try {
        // Obter o curso dos parâmetros de consulta
        let curso = req.query.curso;

        // Verificar se curso é uma string e converter para array se necessário
        if (typeof curso === 'string') {
            curso = [curso]; // Converter para array com um único elemento
        } else if (!Array.isArray(curso)) {
            curso = []; // Caso não seja um array ou uma string, definir como array vazio
        }

        // Construir a cláusula where para a consulta
        let whereClause = {};
        if (curso.length > 0 && !curso.includes('Todos')) {
            whereClause.curso = { [Op.in]: curso };
        }

        //Adicionar filtro adicional para cursos dentro da string
        if (curso.length > 0) {
            whereClause.curso = {
                [Op.or]: [
                    { [Op.like]: `%${curso},%` },   // Para cursos no meio da string
                    { [Op.like]: `${curso},%` },    // Para cursos no início da string
                    { [Op.like]: `%${curso}` }      // Para cursos no final da string
                ]
            };
        }

        // Buscar todos os posts ordenados do mais recente para o mais antigo
        let posts;
        if (curso.includes('Todos')) {
            // Se a opção "Todos" foi selecionada, buscar todos os posts sem filtro de curso
            posts = await Post.findAll({
                order: [['id', 'DESC']],
                limit: 12
            });
        } else {
            // Caso contrário, buscar os posts com o filtro de curso aplicado
            posts = await Post.findAll({
                where: whereClause,
                order: [['id', 'DESC']],
                limit: 12
            });
        }

        // Dividir os posts entre os que vão para os sliders e os que vão para os cards
        const postsSlider = posts.slice(0, 4);  // 4 primeiros posts (ordem decrescente)
        const postsCard = posts.slice(4);       // Restante dos posts

        // Adicionar 1 ao índice de cada post
        const postsCardWithIndex = postsCard.map((post, index) => {
            post.indexPlusOne = index + 1;
            return post;
        });

        // Renderizar a página com os posts encontrados
        if (req.session.user_name) {  // Verificar se o usuário está logado
            if (req.session.user_email === 'aagisnoticias2024@gmail.com') {  // Verificar se o usuário é administrador
                res.render('index', {
                    postsSlider: postsSlider,
                    postsCard: postsCardWithIndex,
                    user_logado: true,
                    user_adm: true,
                    user_foto: req.session.user_foto,
                    user_name: req.session.user_name,
                    user_tipo: 'Adm',
                    style: 'styles.css'
                });
            } else {
                res.render('index', {
                    postsSlider: postsSlider,
                    postsCard: postsCardWithIndex,
                    user_logado: true,
                    user_foto: req.session.user_foto,
                    user_name: req.session.user_name,
                    user_tipo: 'Professor',
                    style: 'styles.css'
                });
            }
        } else {
            res.render('index', {
                postsSlider: postsSlider,
                postsCard: postsCardWithIndex,
                user_logado: false,
                user_name: 'Usuário',
                user_tipo: 'Aluno',
                style: 'styles.css',
            });
        }

    } catch (error) {
        // Capturando qualquer erro que ocorra durante a consulta ao banco de dados
        res.send("Erro ao buscar posts: " + error);
    }
});




//rota login 
app.get('/login', function (req, res) {
    res.render('pag-login', {
        us_repetido,
        email_inexistente,
        senha_incorreta,
        user_criado,
        mensagem_wait,
        user_name: req.session.user_name,
        style: 'styleLogin.css',
    })
    us_repetido = false
    senha_incorreta = false
    email_inexistente = false
    user_criado = false
    mensagem_wait = false
})

app.post('/cadastro', async (req, res) => {
    const email = req.body.emailCadastro
    const nome = req.body.nomeCadastro
    const BDnome = await Usuario.findOne({ where: { email: email } });
    const BDemail = await Usuario.findOne({ where: { nome: nome } });

    console.log("checando se existe nome de usuario ou email já existe")
    if (!BDnome && !BDemail) {
        console.log("nome e email ok")

        // Gerar salt único para usuário
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                console.error("Erro ao gerar salt:", err);
                return;
            }

            // Iniciar processo de hashing para senha do usuário
            bcrypt.hash(req.body.senhaCadastro, salt, (err, hash) => {
                if (err) {
                    console.error("Erro no processo de hash:". err);
                    return;
                }

                // Criar usuário com senha criptografada
                Usuario.create({
                    nome: req.body.nomeCadastro,
                    email: req.body.emailCadastro,
                    senha: hash,
                    aprovado: false,
                    foto_perfil: "/upload/fotoperfil/profile_10693213.png"
                }).then(function () {
                    res.redirect('/login?message=pedido enviado para analise');
                }).catch(function (erro) {
                    res.redirect('/login?message=Houve um erro: ' + erro);
                })
                    us_repetido = false
                    user_criado = true

            });

        });

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
        res.render('pag-controle', { usuario: usuarios_na, style: 'style-painel.css' });

    } catch (err) {
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
                email_inexistente = false;

                // Comparar input com valor da senha hash armazenada
                bcrypt.compare(senha, usuario.senha, (err, result) => {
                    if (err) {
                        console.error("Erro ao comparar senha input com hash:", err);
                    }

                    // Verificar se o input e a senha cadastrada são a mesma
                    if (result) {
                        console.log("Senha correta, redirecionando...");
                        req.session.user_name = usuario.nome; // Armazenar nome do usuário na sessão
                        req.session.user_email = usuario.email;
                        req.session.user_foto = usuario.foto_perfil;
    
                        senha_incorreta = false;
                        res.redirect('/');
                    } else {
                        senha_incorreta = true
                        console.log("Senha incorreta");
                        res.redirect('/login?message=Credenciais inválidas');
                    }

                });
                
            } else {
                console.log("Usuário não aprovado");
                mensagem_wait = true
                res.redirect('/login?message=Usuário em análise');

            }
        } else {
            email_inexistente = true;
            senha_incorreta = false;
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
app.get('/perfil', isLog, async (req, res) => {

    const email = req.session.user_email;

    const usuario = await Usuario.findOne({ where: { email: email } })

    res.render('pag-perfil', {
        usuario: usuario,
        style: 'style-perfil.css'
    });
});

// Rota atualizar perfil
app.post('/attperfil/:id', isLog, async (req, res) => {
    const id = req.params.id;
    const usuario = await Usuario.findOne({ where: { id: id } })

    // Extrair dados do formulário
    var nomeUsuario = req.body.nomeUsuario;
    var email = req.body.email;

    // Caso usuário não atualize o nome ou email
    if (!req.body.nomeUsuario) { nomeUsuario = usuario.nome; }
    if (!req.body.email) { email = usuario.email; }


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

// Rota para postar a notícia
app.post('/add', isLog, async (req, res) => {
    try {
        // Verificar se alguma imagem foi enviada
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('Por favor, adicione uma imagem à notícia. Nenhuma imagem foi enviada.');
        }

        // Extrair dados do formulário
        const titulo = req.body.titulopost;       // Título da notícia
        const subtitulo = req.body.subtitulopost; // Subtítulo da notícia
        let let_conteudo = req.body.conteudopost;   // Conteúdo da notícia
        const conteudo = let_conteudo.replace(/\n/g, '<br>');  // Formatar conteudo
        const data = req.body.date;               // Data do evento // AAAA-MM-DD
        const hora = req.body.time;               // Horário do evento // HH:MM
        const autor = req.session.user_name;      // Nome de quem postou a noticia
        const foto_autor = req.session.user_foto; // Foto de perfil de quem postou a noticia

        const ref_imagem = req.files.picture__input; // Nome do input para a imagem
        const sanitizedFileName = sanitizeFileName(ref_imagem.name);
        const uploadDir = path.join(__dirname, '/upload'); // Diretório de upload

        // Verifica se o diretório de upload existe, se não, cria o diretório
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // Define o caminho completo do arquivo de upload
        const uploadPath = path.join(uploadDir, sanitizedFileName);

        // Move o arquivo para o diretório de upload
        await ref_imagem.mv(uploadPath);

        // Tratar os cursos selecionados
        let cursos;
        if (Array.isArray(req.body.curso)) {
            cursos = req.body.curso.join(', '); // Transforma o array em uma string separada por vírgula e espaço
        } else {
            cursos = req.body.curso; // Se for apenas um valor, mantém como está
        }

        // Criação do post no banco de dados
        await Post.create({
            titulopost: titulo,
            subtitulopost: subtitulo,
            conteudopost: conteudo,
            data: data,
            hora: hora,
            autor: autor,
            foto_autor: foto_autor,
            ref_imagem: '/upload/' + sanitizedFileName,  // Caminho completo da imagem
            curso: cursos // Salvar os cursos selecionados como uma string

        });

        // Redireciona para a página inicial após a criação do post
        res.redirect('/');
    } catch (error) {
        // Se houver algum erro, retorna uma mensagem de erro
        res.status(500).send('Ocorreu um erro: ' + error);
    }
});


// Rota painel
app.get('/painel', isAdm, async (req, res) => {
    try {
        const noticias = await Post.findAll({
            order: [['id', 'DESC']]
        })

        res.render('pag-painel', { noticia: noticias, style: 'style-painel.css' });
    } catch (err) {
        res.send("Erro ao buscar notícias:", err);
    }

});

// Rota para deletar noticia no painel
app.delete('/excluir-noticia/:id', isAdm, async (req, res) => {
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
app.get('/editar-noticia-:id', isAdm, async (req, res) => {
    try {
        const id = req.params.id;
        const noticia = await Post.findOne({
            where: {
                id: id
            }
        })

        var conteudo = noticia.conteudopost;
        conteudo = conteudo.replace(/<br>/g, '\n'); // Desformatar conteudo

        res.render('pag-editarNoticia', { noticia: noticia, conteudo: conteudo, style: 'css/style-post.css' });

    } catch (err) {
        res.send("Erro: " + err);
    }

});

// rota para atualizar noticia no banco
app.post('/attnoticia/:id', isAdm, async (req, res) => {
    const id = req.params.id;
    const noticia = await Post.findOne({ where: { id: id } })

    // Extrair dados do formulário
    var titulo = req.body.titulopost;
    var subtitulo = req.body.subtitulopost;
    let let_conteudo = req.body.conteudopost;
    var conteudo = let_conteudo.replace(/\n/g, '<br>');  // Formatar conteudo
    var data = req.body.date;
    var hora = req.body.time;
    var foto_noticia_temp;
    var foto_noticia;

    // Caso usuário não atualize algum dado
    if (!req.body.titulopost) { titulo = noticia.titulopost; }
    if (!req.body.subtitulopost) { subtitulo = noticia.subtitulopost; }
    if (!req.body.conteudopost) { conteudo = noticia.conteudopost; }
    if (!req.body.date) { data = noticia.data; }
    if (!req.body.time) { hora = noticia.hora; }

    // Verificar se usuário enviou imagem
    if (req.files && req.files.picture__input) {
        foto_noticia_temp = req.files.picture__input;
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

    // Tratar os cursos selecionados
    var cursos;
    if (req.body.curso) {

        if (Array.isArray(req.body.curso)) {
            cursos = req.body.curso.join(', '); // Transforma o array em uma string separada por vírgula e espaço
        } else {
            cursos = req.body.curso; // Se for apenas um valor, mantém como está
        }
    } else { cursos = noticia.curso; }

    // Atualizar dados do usuário
    Post.update(
        {
            titulopost: titulo,
            subtitulopost: subtitulo,
            conteudopost: conteudo,
            data: data,
            hora: hora,
            ref_imagem: foto_noticia,
            curso: cursos
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

//rota calendario
app.get('/calendario', async (req, res) => {
    try {
        // Busca todos os eventos com data registrada
        const eventos = await Post.findAll({
            where: {
                data: {
                    [Op.ne]: null
                }
            },
            order: [['id', 'DESC']]
        });


        // Converter os eventos no formato necessário
        const eventsArr = eventos.map(evento => {
            const [year, month, day] = evento.data.split('-').map(Number);  // Sepra a string pelos "-" pra separar ano mes e dia
            return {
                day: day,
                month: month,
                year: year,
                events: [{
                    title: evento.titulopost,
                    time: evento.hora
                }]
            };
        });

        // Agrupar os eventos pelo mesmo dia
        const groupedEvents = eventsArr.reduce((acc, curr) => {
            const key = `${curr.day}-${curr.month}-${curr.year}`;
            if (!acc[key]) {
                acc[key] = { day: curr.day, month: curr.month, year: curr.year, events: [] };
            }

            acc[key].events.push(...curr.events);
            return acc;
        }, {});

        // Converter o objeto agrupado em um array
        const finalEventsArr = Object.values(groupedEvents);

        // Renderizar a página com os eventos
        res.render('pag-calendario', {
            eventos: JSON.stringify(finalEventsArr),   // Mudar para formato json para mandar pro script
            style: 'css/style-calendario.css'
        });

    } catch (err) {
        res.status(500).send('Erro ao buscar eventos: ' + err.message);
    }
});

// Rota init gemini
app.post('/initGemini-:id', async(req, res) => {
    try{
        const id = req.params.id;
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        // Buscar o post a partir do id
        const post = await Post.findOne({
            where: {
                id: id
            }
        });

        const prompt = "Segue o título, conteúdo e imagem de capa de uma notícia em um site. Descreva a imagem e resuma o conteúdo da notícia para uma pessoa cega. Não crie informações adicionais que não estejam na própria notícia. Descreva a imagem e o conteúdo da notícia em parágrafos diferentes.\nTitulo: " + post.titulopost + "\nConteúdo: " + post.conteudopost;

        const uploadDir = __dirname + post.ref_imagem;
        const imageParts = [fileToGenerativePart(uploadDir, "image/jpeg")];

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        var text = response.text();

        text = removerAcento(text);

        console.log(text);
        say.speak(text, '', 1.2);

    }catch(error){
        console.error('Erro:', error);
    }
})


app.listen(6969, function () {
    console.log("Server on: http://localhost:6969")
});