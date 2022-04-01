$(document).ready(function() {
    $('#question1').on('click', function () {
        $('#viewDetails').toggle(1000)
    })
})

$(document).ready(function () {
    $('#start1').on('click', function () {
        $('#welcomeScreen').toggle(0)
    })
})

// 21
let game =  {
    you : {
        scoreSpan : '#result',
        div : "#your-box",
        score: 0,
    },
    dealer : {
        scoreSpan : '#resultt',
        div : "#dealer-box",
        score: 0,
    },

    cards: ["2","3","4","5","6","7","8","9","10","K","J","Q","A"],

    cardsMap : {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        K: 10,
        J: 10,
        Q: 10,
        A: [1,11],
    },

    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    isTurnOver: false,
    pressOnce: false,
};

const YOU = game['you'];
const DEALER = game['dealer']

const hitSound = new Audio("sounds/Swoosh.mp3")
const winSound = new Audio("sounds/win.mp3")
const loseSound = new Audio("sounds/aww.mp3")

let winner;
document
    .querySelector("#hitButton")
    .addEventListener("click", hit);
document
    .querySelector("#standButton")
    .addEventListener("click",stand);
document
    .querySelector("#dealButton")
    .addEventListener("click",restart);

function hit(){
    if(game["isStand"] === false) {
        let card = randomCard();
        console.log(card)
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return game["cards"][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        let tempCard = card.toString();
        //cardImage.src = "images/{temp}.png";
        cardImage.src = "images/" + tempCard + ".png";
        // cardImage.style.height = '41vh'
        // cardImage.style.width = '35vw'
        cardImage.style.position = 'relative'
        cardImage.style.marginRight = '-12vw'
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitSound.play();
    }
}

function updateScore(card, activePlayer){
    if(card === "A"){
        if( activePlayer["score"] + game["cardsMap"][card][1] <=21){
            activePlayer["score"] += game["cardsMap"][card][1];
        } else {
            activePlayer["score"] += game["cardsMap"][card][0];
        }
    } else {
        activePlayer["score"] += game["cardsMap"][card];
    }
    console.log(activePlayer["score"]);
}
function showScore(activePlayer){
    if (activePlayer["score"] > 21){
        document.querySelector(activePlayer["scoreSpan"]).textContent = "Проигрыш!";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    }
    else{
        document.querySelector(activePlayer["scoreSpan"]).textContent =
            activePlayer["score"];
    }
}
//одинаковое кол-во выдачи карт
function stand(){
    if(game.pressOnce === false) {
        game['isStand'] = true;
        let yourImages = document
            .querySelector("#your-box")
            .querySelectorAll("img");

        for (let i = 0; i < yourImages.length; i++) {
            let card = randomCard();
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
        }

        game["isTurnsOver"] = true;
        calculateWinner();
        showWinner(winner)
    }
    game.pressOnce = true;
}

function calculateWinner()
{
    if (YOU['score'] <=21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21)
        {
            winner = YOU;
        }

        else if (YOU['score'] < DEALER['score'])
        {
            winner = DEALER
        }

        else if(YOU['score'] === DEALER['score'])
        {
            winner ="Draw"
        }
    }
    else if(YOU['score'] > 21 && DEALER['score'] <=21)
    {
        winner = DEALER;
    }

    else if(YOU['score'] > 21 && DEALER['score'] >21)
    {
    winner = "None";
    }
    return winner
}

function showWinner(){

    if(winner === YOU){
        document.querySelector('#wins').textContent = game['wins']+=1;
        winSound.play();
    }

    if(winner === DEALER){
        document.querySelector('#losses').textContent = game['losses']+=1;
        loseSound.play();
    }

    if(winner === 'None'){
        loseSound.play();
    }

}

function restart(){

    if(game['isTurnsOver'] === true)
    {
        let yourImages = document.querySelector('#your-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')

        YOU['score'] = DEALER['score'] = 0
        document.querySelector('#result').textContent = 0;
        document.querySelector('#resultt').textContent = 0;

        document.querySelector('#result').style.color = 'white';
        document.querySelector('#resultt').style.color = 'white';

        for( let i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
            dealerImages[i].remove();
        }
        game["isStand"] = false
        game.pressOnce = false
        game["isTurnOver"] = false

    }
}
