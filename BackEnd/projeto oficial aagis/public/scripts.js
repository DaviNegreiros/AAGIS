/*--slides show--*/
let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
    nextImage();
}, 7000)

function nextImage() {
    count++;
    if (count > 4) {
        count = 1;
    }
    document.getElementById("radio" + count).checked = true;

}
/*-- FIM slides show--*/

/*--SIDEBAR--*/
let btn = document.querySelector('#btn');
let slidebar = document.querySelector('.sidebar');

btn.onclick = function () {
    slidebar.classList.toggle('active');
    if (filtro.classList.contains('activeFiltro')) {
        filtro.classList.toggle('activeFiltro');
    }
};
/*--FIM  SIDEBAR--*/
/*--FILTRO--*/
let btnFiltro = document.querySelector('#btnFiltro');
let filtro = document.querySelector('.filtro');

btnFiltro.onclick = function () {
    if (slidebar.classList.contains('active')) {
        filtro.classList.toggle('activeFiltro');
    } else {
        slidebar.classList.toggle('active');
        setTimeout(function () {
            filtro.classList.toggle('activeFiltro');
        }, 300);

    }
};
/*--FIM  FILTRO--*/
/*-- Checka Tchecka --*/
const cbAll = document.querySelectorAll('.filtro1 input[type="checkbox"]');
cb1 = document.querySelector('#cb1');
cb2 = document.querySelector('#cb2');
cb3 = document.querySelector('#cb3');
cb4 = document.querySelector('#cb4');
cb5 = document.querySelector('#cb5');
cb6 = document.querySelector('#cb6');
cb7 = document.querySelector('#cb7');

function ck1(){
    cb1.checked = true;
    for (const checkbox of cbAll) {
        if (checkbox !== cb1) {
          checkbox.checked = false;
        }
      }
}
function ck2(){
    cb2.checked = true;
    for (const checkbox of cbAll) {
        if (checkbox !== cb2) {
          checkbox.checked = false;
        }
      }
}
function ck3(){
    cb3.checked = true;
    for (const checkbox of cbAll) {
        if (checkbox !== cb3) {
          checkbox.checked = false;
        }
      }
}
function ck4(){
    cb4.checked = true;
    for (const checkbox of cbAll) {
        if (checkbox !== cb4) {
          checkbox.checked = false;
        }
      }
}
function ck5(){
    cb5.checked = true;
    for (const checkbox of cbAll) {
        if (checkbox !== cb5) {
          checkbox.checked = false;
        }
      }
}
function ck6(){
    cb6.checked = true;
    for (const checkbox of cbAll) {
        if (checkbox !== cb6) {
          checkbox.checked = false;
        }
      }
}
function ck7(){
    cb7.checked = true;
    for (const checkbox of cbAll) {
        if (checkbox !== cb7) {
          checkbox.checked = false;
        }
      }
}

/*-- FIM Checka Tcheka--*/

/*--INICIO MODAL--*/
function abrirModalS1() {
    document.getElementById('modalS1').style.display = 'block';
}
function abrirModalS2() {
    document.getElementById('modalS2').style.display = 'block';
}
function abrirModalS3() {
    document.getElementById('modalS3').style.display = 'block';
}
function abrirModalS4() {
    document.getElementById('modalS4').style.display = 'block';
}
function abrirModal1() {
    document.getElementById('modal1').style.display = 'block';
}
function abrirModal2() {
    document.getElementById('modal2').style.display = 'block';
}
function abrirModal3() {
    document.getElementById('modal3').style.display = 'block';
}
function abrirModal4() {
    document.getElementById('modal4').style.display = 'block';
}
function abrirModal5() {
    document.getElementById('modal5').style.display = 'block';
}
function abrirModal6() {
    document.getElementById('modal6').style.display = 'block';
}
function abrirModal7() {
    document.getElementById('modal7').style.display = 'block';
}
function abrirModal8() {
    document.getElementById('modal8').style.display = 'block';
}


function fecharModalS1() {
    document.getElementById('modalS1').style.display = 'none';
}
function fecharModalS2() {
    document.getElementById('modalS2').style.display = 'none';
}
function fecharModalS3() {
    document.getElementById('modalS3').style.display = 'none';
}
function fecharModalS4() {
    document.getElementById('modalS4').style.display = 'none';
}
function fecharModal1() {
    document.getElementById('modal1').style.display = 'none';
}
function fecharModal2() {
    document.getElementById('modal2').style.display = 'none';
}
function fecharModal3() {
    document.getElementById('modal3').style.display = 'none';
}
function fecharModal4() {
    document.getElementById('modal4').style.display = 'none';
}
function fecharModal5() {
    document.getElementById('modal5').style.display = 'none';
}
function fecharModal6() {
    document.getElementById('modal6').style.display = 'none';
}
function fecharModal7() {
    document.getElementById('modal7').style.display = 'none';
}
function fecharModal8() {
    document.getElementById('modal8').style.display = 'none';
}

function abrirModalS1() {
    document.getElementById('modalS1').classList.add('modal-aberto');
    document.getElementById('overlayS1').classList.add('overlay-aberto');
}
function abrirModalS2() {
    document.getElementById('modalS2').classList.add('modal-aberto');
    document.getElementById('overlayS2').classList.add('overlay-aberto');
}
function abrirModalS3() {
    document.getElementById('modalS3').classList.add('modal-aberto');
    document.getElementById('overlayS3').classList.add('overlay-aberto');
}
function abrirModalS4() {
    document.getElementById('modalS4').classList.add('modal-aberto');
    document.getElementById('overlayS4').classList.add('overlay-aberto');
}
function abrirModal1() {
    document.getElementById('modal1').classList.add('modal-aberto');
    document.getElementById('overlay1').classList.add('overlay-aberto');
}
function abrirModal2() {
    document.getElementById('modal2').classList.add('modal-aberto');
    document.getElementById('overlay2').classList.add('overlay-aberto');
}
function abrirModal3() {
    document.getElementById('modal3').classList.add('modal-aberto');
    document.getElementById('overlay3').classList.add('overlay-aberto');
}
function abrirModal4() {
    document.getElementById('modal4').classList.add('modal-aberto');
    document.getElementById('overlay4').classList.add('overlay-aberto');
}
function abrirModal5() {
    document.getElementById('modal5').classList.add('modal-aberto');
    document.getElementById('overlay5').classList.add('overlay-aberto');
}
function abrirModal6() {
    document.getElementById('modal6').classList.add('modal-aberto');
    document.getElementById('overlay6').classList.add('overlay-aberto');
}
function abrirModal7() {
    document.getElementById('modal7').classList.add('modal-aberto');
    document.getElementById('overlay7').classList.add('overlay-aberto');
}
function abrirModal8() {
    document.getElementById('modal8').classList.add('modal-aberto');
    document.getElementById('overlay8').classList.add('overlay-aberto');
}

function fecharModalS1() {
    document.getElementById('modalS1').classList.remove('modal-aberto');
    document.getElementById('overlayS1').classList.remove('overlay-aberto');
}
function fecharModalS2() {
    document.getElementById('modalS2').classList.remove('modal-aberto');
    document.getElementById('overlayS2').classList.remove('overlay-aberto');
}
function fecharModalS3() {
    document.getElementById('modalS3').classList.remove('modal-aberto');
    document.getElementById('overlayS3').classList.remove('overlay-aberto');
}
function fecharModalS4() {
    document.getElementById('modalS4').classList.remove('modal-aberto');
    document.getElementById('overlayS4').classList.remove('overlay-aberto');
}
function fecharModal1() {
    document.getElementById('modal1').classList.remove('modal-aberto');
    document.getElementById('overlay1').classList.remove('overlay-aberto');
}
function fecharModal2() {
    document.getElementById('modal2').classList.remove('modal-aberto');
    document.getElementById('overlay2').classList.remove('overlay-aberto');
}
function fecharModal3() {
    document.getElementById('modal3').classList.remove('modal-aberto');
    document.getElementById('overlay3').classList.remove('overlay-aberto');
}
function fecharModal4() {
    document.getElementById('modal4').classList.remove('modal-aberto');
    document.getElementById('overlay4').classList.remove('overlay-aberto');
}
function fecharModal5() {
    document.getElementById('modal5').classList.remove('modal-aberto');
    document.getElementById('overlay5').classList.remove('overlay-aberto');
}
function fecharModal6() {
    document.getElementById('modal6').classList.remove('modal-aberto');
    document.getElementById('overlay6').classList.remove('overlay-aberto');
}
function fecharModal7() {
    document.getElementById('modal7').classList.remove('modal-aberto');
    document.getElementById('overlay7').classList.remove('overlay-aberto');
}
function fecharModal8() {
    document.getElementById('modal8').classList.remove('modal-aberto');
    document.getElementById('overlay8').classList.remove('overlay-aberto');
}
/*--FIM MODAL--*/

/*-- BOTAO HOME --*/
function homeFunction() {
    window.location.href = '/'; // Redirect to homepage URL
}

/*-- FIM BOTAO HOME--*/

/*-- ROTA POST --*/
function rotaPost() {
    window.location.href = '/post'
}
/*-- FIM ROTA POST --*/

/*== JS LOGIN E CADASTRO ==*/
document.getElementById("loginForm").addEventListener("submit", function (event) {
    // Validar campos de login aqui
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Por favor, preencha todos os campos do formulário de login.");
        event.preventDefault(); // Impede o envio do formulário
    }
});

document.getElementById("signupForm").addEventListener("submit", function (event) {
    // Validar campos de cadastro aqui
    var name = document.getElementById("signupName").value;
    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Por favor, preencha todos os campos do formulário de cadastro.");
        event.preventDefault(); // Impede o envio do formulário
    }
});

document.querySelectorAll('.filtro1 input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        document.getElementById('filtroForm').submit();
    });
});
// scripts.js

// Função que será chamada quando o botão for clicado
function exibirMensagem() {
    alert('Você clicou no botão!');
}

// Event listener para o botão
document.addEventListener('DOMContentLoaded', function () {
    // Seletor para o botão (substitua pelo seu seletor real)
    var botao = document.querySelector('#meuBotao');

    // Adicionando o evento de clique ao botão
    botao.addEventListener('click', exibirMensagem);
});

// Função initGemini
function initGemini(id) {
    const button = document.getElementById('btnGemini');
    button.disabled = true;


    fetch(`/initGemini-${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})

    }).then(response => response.json()).then(data => {
        console.log('Gemini iniciado...');
    }).catch(error => {
        console.error('Erro:', error);
    });

    setTimeout(() => {
        button.disabled = false;
    }, 10000);  // 10000ms = 10s

}

