const spanPlayer = document.querySelector(".player");
const points = document.querySelector(".points");
const timer = document.querySelector(".timer");
const grid = document.querySelector(".grid");

let currentTimer = 0;
let pontos = 0;

//QUANDO A JANELA FOR INICIADA.
window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem("player");
    
    startTimer();
    loadGame();
    
};

//FUNÇÂO PARA O TEMPO CORRER.
const startTimer = () => {

    this.loop = setInterval(() => {

        points.innerHTML = pontos;
        currentTimer++;
        timer.innerHTML = currentTimer;

    }, 1000);
}

//ARRAY DOS PERSONAGENS DAS CARTAS.
const characters = [
    "Cartman",
    "Chef South Park",
    "Ike Broflovski",
    "Kenny",
    "Kyle",
    "Mãe do Cartman",
    "Mãe do Kyle",
    "Randy Marsh",
    "Stan",
    "South Park",
];

//DOBRANDO O TAMANHO DO ARRAY.
const duplicateCharacters = [...characters, ...characters];

//EMBARALHAR AS CARTAS.
const shuffledArray = duplicateCharacters.sort(() => Math.random() -0.5);

//FUNÇÂO PARA CRIAR OS ELEMENTOS.
const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    return element;
};

//CRIAR AS CARTAS.
const createCard = (character) => {

    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url("../images/${character}.png")`;


    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character);

    return card;
    
};

//FUNÇÂO INICIAR O JOGO.
const loadGame = () => {
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    })

    

};

let firstCard = "";
let secondCard = "";

//FUNÇÂO REVELAR A CARTA.
const revealCard = ({target}) => {

    if (target.parentNode.className.includes("reveal-card")) {
        return;
    }

    if (firstCard === "") {
        
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;

    } else if(secondCard === "") {
        
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;
    }

    checkCards()
   
};

//FUNÇÂO PARA CHECAR AS CARTAS.



const checkCards = () => {

    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        //QUANDO AS CARTAS FOREM IGUAIS.

        pontos += 10;

        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

       

        checkEndGame();

    } else {
        //QUANDO AS CARTAS FOREM DIFERENTES.

        pontos -= 2;

        setTimeout(() => {

            
                firstCard.classList.remove("reveal-card");
                secondCard.classList.remove("reveal-card");

                firstCard = "";
                secondCard = "";
            
        }, 500);
    }
};

//FUNÇÂO PARA CHECAR FIM DE JOGO.
const checkEndGame = () => {

    

    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 20) {

        localStorage.setItem("score", pontos);
        localStorage.setItem("recordTimer", currentTimer);

        clearInterval(this.loop);

        setTimeout(() => {

            alert(`Parabéns ${spanPlayer.innerHTML}.
                Tempo Total: ${currentTimer} segundos.
                Pontos: ${pontos}.`
            );

            const dialog = confirm("Gostaria de Jogar Novamente???")

        if (dialog) {
            
            window.location.reload();

        } else {
            
            window.location.href = "../index.html"
        }

        }, 500);

        
        

    };


};

