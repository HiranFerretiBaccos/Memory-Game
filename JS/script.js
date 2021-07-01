const FRONT = "card_front";
const BACK = "card_back";
const CARD = "cardContainer"
const ICON = "icon"

startGame();

function startGame() {
    initializeCards(GAME.createCardsFromTechs());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoardContainer");
    gameBoard.innerHTML = "";
    GAME.cards.forEach(card => {

        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

function flipCard() {

    if (GAME.setCard(this.id)) {

        this.classList.add("flip");
        if (GAME.secondCard) {
            if (GAME.checkMatch()) {
                GAME.clearCards();
                if (GAME.checkGameOver()) {
                    let GameOverLayer = document.getElementById("gameOver");
                    GameOverLayer.style.display = "flex";
                };
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(GAME.firstCard.id);
                    let secondCardView = document.getElementById(GAME.secondCard.id);

                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");
                    GAME.unflipCards();
                }, 1000);
            };
        }
    }
}

function restart() {
    GAME.clearCards();
    startGame();
    let GameOverLayer = document.getElementById("gameOver");
    GameOverLayer.style.display = "none";
}