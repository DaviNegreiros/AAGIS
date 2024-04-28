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
    function abrirModal() {
        document.getElementById('modal').style.display = 'block';
    }
    
    function fecharModal() {
        document.getElementById('modal').style.display = 'none';
    }
    function abrirModal() {
        document.getElementById('modal').classList.add('modal-aberto');
        document.getElementById('overlay').classList.add('overlay-aberto');
    }
    
    function fecharModal() {
        document.getElementById('modal').classList.remove('modal-aberto');
        document.getElementById('overlay').classList.remove('overlay-aberto');
    }
    /*--FIM MODAL--*/