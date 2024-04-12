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
const button = document.querySelector("button")
const modal = document.querySelector("dialog")

button.onclick = function(){
modal.showModal()

}
