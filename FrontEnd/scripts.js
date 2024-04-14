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
