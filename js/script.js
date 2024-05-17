const board = document.querySelector('.board');
const restartBtn = document.getElementById('restart-btn');

const images = [
    'img-1.png',
    'img-2.png',
    'img-3.png',
    'img-4.png',
    'img-5.png',
    'img-6.png',
    'img-7.png',
    'img-8.png',
];

let firstCard = null;
let secondCard = null;
let canFlip = true;

function createBoard() {
    const shuffledImages = shuffle(images.concat(images)); // Duplicamos las imágenes y las mezclamos
    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<img src="images/${shuffledImages[i]}" alt="card">`;
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    }
}

function flipCard(card) {
    if (!canFlip || card === firstCard) return;

    card.querySelector('img').style.display = 'block';

    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
        setTimeout(() => {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetCards();
        }, 1000);
    } else {
        canFlip = false;
        setTimeout(() => {
            firstCard.querySelector('img').style.display = 'none';
            secondCard.querySelector('img').style.display = 'none';
            resetCards();
            canFlip = true;
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

function restartGame() {
    board.innerHTML = '';
    createBoard();
}

restartBtn.addEventListener('click', restartGame);

// Función para mezclar las imágenes de forma aleatoria
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // Mientras haya elementos restantes para mezclar
    while (currentIndex !== 0) {
        // Escoge un elemento restante
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Intercambia el elemento restante con el elemento actual
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

createBoard();
