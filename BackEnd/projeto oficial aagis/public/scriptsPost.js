const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");

if (pictureImage.innerHTML == '') {
  const pictureImageTxt = "Escolha uma imagem";
  pictureImage.innerHTML = pictureImageTxt;

}


inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture__img");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var tituloTextarea = document.getElementById("titulo");
  var textoTextarea = document.getElementById("texto");
  var subtituloTextarea = document.getElementById("subtitulo");

  tituloTextarea.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          event.preventDefault();
          subtituloTextarea.focus(); 
      }
  });
  subtituloTextarea.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        textoTextarea.focus(); 
    }
});
});

/*-- BOTAO HOME --*/
function homeFunction() {
    window.location.href = '/'; // Redirect to homepage URL
}

/*-- FIM BOTAO HOME--*/
