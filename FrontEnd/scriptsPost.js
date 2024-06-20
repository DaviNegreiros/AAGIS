const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Escolha uma imagem";
pictureImage.innerHTML = pictureImageTxt;

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
    window.location.href = '/Frontend/'; // Redirect to homepage URL
}

/*-- FIM BOTAO HOME--*/

/*--inicio envio obrigatório--*/
document.getElementById('submitButton').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o envio do formulário até a validação ser completada
  
  let errorMessages = [];
  let titulo = document.getElementById('titulo').value.trim();
  let subtitulo = document.getElementById('subtitulo').value.trim();
  let texto = document.getElementById('texto').value.trim();
  let date = document.getElementById('date').value.trim();
  let time = document.getElementById('time').value.trim();
  let picture = document.getElementById('picture__input').files.length;
  let checkboxes = document.querySelectorAll('#checkbox-container input[type="checkbox"]');
  let checkboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

  if (titulo === '') errorMessages.push('O campo "Título" é obrigatório.');
  if (subtitulo === '') errorMessages.push('O campo "Subtítulo" é obrigatório.');
  if (texto === '') errorMessages.push('O campo "Texto" é obrigatório.');
  if (date === '') errorMessages.push('O campo "Data" é obrigatório.');
  if (time === '') errorMessages.push('O campo "Hora" é obrigatório.');
  if (picture === 0) errorMessages.push('O campo "Imagem" é obrigatório.');
  if (!checkboxChecked) errorMessages.push('Pelo menos uma categoria deve ser selecionada.');

  if (errorMessages.length > 0) {
      alert(errorMessages.join('\n'));
  } else {
      alert('Formulário enviado com sucesso!');
  }
});
