const form = document.querySelector(".login-form");
const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");

//FUNÇÂO PARA ACIONAR O BOTÂO JOGAR
const validateInput = ({target}) => {

   if (target.value.length > 2) {
    button.removeAttribute("disabled");
    return;
   }

   button.setAttribute("disabled", "");
};

//FUNÇAO PARA GUARDAR O NOME
const handleSubmit = (event) => {

    event.preventDefault();

    //SALVA A CHAVE PLAYER NO LOCALSTORAGE.
    localStorage.setItem("player", input.value);

    //DIRECIONA PARA A NOVA PAGINA DO GAME.
    window.location = "pages/game.html";

};

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
