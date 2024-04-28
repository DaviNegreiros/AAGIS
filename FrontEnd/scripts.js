/*--slides show--*/
let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
    nextImage();
}, 7000)

function nextImage(){
    count++;
    if(count>4){
        count = 1;
    }
    document.getElementById("radio"+count).checked = true;

}
/*-- FIM slides show--*/

/*--SIDEBAR--*/
    let btn = document.querySelector('#btn');
    let slidebar = document.querySelector('.sidebar');

    btn.onclick = function() {
        slidebar.classList.toggle('active');
    };
    /*--FIM SIDEBAR--*/  

    /*--INICIO MODAL--*/
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

    function abrirModal1() {
        document.getElementById('modal1').classList.add('modal-aberto');
        document.getElementById('overlay').classList.add('overlay-aberto');
    }
    function abrirModal2() {
        document.getElementById('modal2').classList.add('modal-aberto');
        document.getElementById('overlay').classList.add('overlay-aberto');
    }
    function abrirModal3() {
        document.getElementById('modal3').classList.add('modal-aberto');
        document.getElementById('overlay').classList.add('overlay-aberto');
    }
    function abrirModal4() {
        document.getElementById('modal4').classList.add('modal-aberto');
        document.getElementById('overlay').classList.add('overlay-aberto');
    }
    function abrirModal5() {
        document.getElementById('modal5').classList.add('modal-aberto');
        document.getElementById('overlay').classList.add('overlay-aberto');
    }
    function abrirModal6() {
        document.getElementById('modal6').classList.add('modal-aberto');
        document.getElementById('overlay').classList.add('overlay-aberto');
    }
    function abrirModal7() {
        document.getElementById('modal7').classList.add('modal-aberto');
        document.getElementById('overlay').classList.add('overlay-aberto');
    }
    function abrirModal8() {
        document.getElementById('modal8').classList.add('modal-aberto');
        document.getElementById('overlay').classList.add('overlay-aberto');
    }
    
    function fecharModal1() {
        document.getElementById('modal1').classList.remove('modal-aberto');
        document.getElementById('overlay').classList.remove('overlay-aberto');
    }
    function fecharModal2() {
        document.getElementById('modal2').classList.remove('modal-aberto');
        document.getElementById('overlay').classList.remove('overlay-aberto');
    }
    function fecharModal3() {
        document.getElementById('modal3').classList.remove('modal-aberto');
        document.getElementById('overlay').classList.remove('overlay-aberto');
    }
    function fecharModal4() {
        document.getElementById('modal4').classList.remove('modal-aberto');
        document.getElementById('overlay').classList.remove('overlay-aberto');
    }
    function fecharModal5() {
        document.getElementById('modal5').classList.remove('modal-aberto');
        document.getElementById('overlay').classList.remove('overlay-aberto');
    }
    function fecharModal6() {
        document.getElementById('modal6').classList.remove('modal-aberto');
        document.getElementById('overlay').classList.remove('overlay-aberto');
    }
    function fecharModal7() {
        document.getElementById('modal7').classList.remove('modal-aberto');
        document.getElementById('overlay').classList.remove('overlay-aberto');
    }
    function fecharModal8() {
        document.getElementById('modal8').classList.remove('modal-aberto');
        document.getElementById('overlay').classList.remove('overlay-aberto');
    }
    /*--FIM MODAL--*/