let btn1 = document.querySelector('#btn1')
let btn2 = document.querySelector('#btn2')
let btnClose = document.querySelector('#btnClose')
let fakeModal = document.querySelector('#fm')

function editarNoticia(id) {
    window.location.href = `/editar-noticia-${id}`;
}

function excluirNoticia(id) {
    fetch(`/excluir-noticia/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            window.location.reload();  // Atualizar pagina
        } else {
            alert('Falha ao excluír notícia.');
        }
    })
    .catch(err => {
        console.error('Erro:', err);
        alert('Ocorreu um erro ao excluir a notícia.');
    });
}

function abrirModal(){
    if(fakeModal.classList.contains('HIDE')){
    fakeModal.classList.toggle("HIDE")
    }
}
function fecharModal(){
    if(fakeModal.classList.contains('HIDE')){
    } else{
    fakeModal.classList.toggle("HIDE")

    }
}

/*-- BOTAO HOME --*/
function homeFunction() {
    window.location.href = '/'; // Redirect to homepage URL
}

/*-- FIM BOTAO HOME--*/
