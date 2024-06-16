/*-- BOTAO HOME --*/
function homeFunction() {
    window.location.href = '/'; // Redirect to homepage URL
}

/*-- FIM BOTAO HOME--*/

/*-- APROVAR E RECUSAR --*/
function aprovarUsuario(id) {
    fetch(`/aprovar-usuario/${id}`, {
        method: 'GET'
    })
    .then(response => {
        if (response.ok) {
            alert('Usuário aprovado com sucesso!');
            window.location.reload();  // Atualizar pagina
        } else {
            alert('Falha ao aprovar usuário.');
        }
    })
    .catch(err => {
        console.error('Erro:', err);
        alert('Ocorreu um erro ao aprovar o usuário.');
    });
}

function deletarUsuario(id) {
    fetch(`/deletar-usuario/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Usuário deletado com sucesso!');
            window.location.reload();  // Atualizar pagina
        } else {
            alert('Falha ao deletar usuário.');
        }
    })
    .catch(err => {
        console.error('Erro:', err);
        alert('Ocorreu um erro ao deletar o usuário.');
    });
}

/*-- FIM APROVAR E RECUSAR --*/