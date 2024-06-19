let btn1 = document.querySelector('#btn1')
let btn2 = document.querySelector('#btn2')
let btnClose = document.querySelector('#btnClose')
let fakeModal = document.querySelector('#fm')

function abrirModal(){
    if(fakeModal.classList.contains('HIDE')){
    fakeModal.classList.toggle("HIDE")
    }
}
function homeFunction() {
    window.location.href = '/Frontend/'; // Redirect to homepage URL
}