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
    /*--FIM  SIDEBAR--*/  

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