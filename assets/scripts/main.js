"use strict";
//Scores 
let scores = {
    playerScores: 0,
    computerScores: 0
}
//Choice Made by Computer and Player
let choice = {
    playerChoice: "",
    computerChoice: ""
}
//Winovers of RPS
let winOver = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
}
//Grab UI Components and set some variables
let playerScores = document.querySelector("#playerScores");
let computerScores = document.querySelector("#computerScores");
let tagline = document.querySelector("#tagline");
let popup = document.querySelector("#popup");
let modal = document.querySelector("#modal");
let reset = document.querySelector("#reset");
let computerChoiceIcon = document.querySelector("#choiceIcon");
let winnerDiv = document.querySelector("#winner");
let winOverDiv = document.querySelector("#winOver");
var hideThis;
//Grab all player's Choices and Initilize the game
const choices = document.querySelectorAll('.choice-btn');
choices.forEach(choice => {
    choice.addEventListener('click', play);

});
//Hide the Modal and Popup Window
popup.addEventListener("click", (event) => {
    (event.target.id === "modal") ?
    event.stopPropagation(): popup.classList.add("hidden");
});
//Remove Icon of computer choice from the modal
function removeIcon() {
    if (computerChoiceIcon.classList.contains("fa-hand-rock")) {
        computerChoiceIcon.classList.remove("fa-hand-rock");
    } else if (computerChoiceIcon.classList.contains("fa-hand-paper")) {
        computerChoiceIcon.classList.remove("fa-hand-paper");
    } else if (computerChoiceIcon.classList.contains("fa-hand-scissors")) {
        computerChoiceIcon.classList.remove("fa-hand-scissors");
    }
}
//Reset the game
reset.addEventListener("click", () => {
    scores.playerScores = 0;
    scores.computerScores = 0;
    displayScores();
    tagline.innerText = "";
    choice.playerChoice = "";
    choice.computerChoice = "";
    removeIcon();
    winOverDiv.innerText = "";
    winnerDiv.removeAttribute("class");
    winnerDiv.innerText = "";
});
//Computer's Move 
function computerMove() {
    let randomMove = 1 + Math.floor(Math.random() * Math.floor(3));
    switch (randomMove) {
        case 1:
            choice.computerChoice = "rock";
            break;
        case 2:
            choice.computerChoice = "paper";
            break;
        case 3:
            choice.computerChoice = "scissors";
            break;
    }
}
//Check for tie and get winner
function winner() {
    if (choice.playerChoice === choice.computerChoice) {
        return "tie";
    } else {
        if (winOver[choice.playerChoice] === choice.computerChoice) {
            scores.playerScores += 1;
            return "player";
        } else {
            scores.computerScores += 1;
            return "computer";
        }
    }
}
//Display Scores
function displayScores() {
    playerScores.innerHTML = scores.playerScores;
    computerScores.innerHTML = scores.computerScores;
}
//Display Computer Choice and Results
function displayResults(winnerResult) {
    popup.classList.remove("hidden");
    modal.style.animationPlayState = "running";
    modal.style.WebkitAnimationPlayState = "running";
    removeIcon();
    computerChoiceIcon.classList.add("fa-hand-" + choice.computerChoice);
    if (winnerResult === "player") {
        winOverDiv.innerText = choice.playerChoice + " wins over " + choice.computerChoice;
        winnerDiv.removeAttribute("class");
        winnerDiv.classList.add("text-green");
        winnerDiv.innerText = "Player Won";
    } else if (winnerResult === "computer") {
        winnerDiv.removeAttribute("class");
        winOverDiv.innerText = choice.computerChoice + " wins over " + choice.playerChoice;
        winnerDiv.classList.add("text-parrot");
        winnerDiv.innerText = "Computer Won";
    } else {
        winOverDiv.innerText = "";
        winnerDiv.removeAttribute("class");
        winnerDiv.classList.add("text-dark");
        winnerDiv.innerText = "It's a tie";
    }
}

//Automatically hide Popup Window
async function hideResults() {

    await setTimeout(() => {
        if (popup.classList.contains("hidden")) {
            clearTimeout(this);
        } else {
            popup.classList.add("hidden");
        }

    }, 10000);
    clearTimeout();
}
//Game Main Function
function play(event) {
    if (event.target.id === "") {
        choice.playerChoice = event.target.parentElement.id;
    } else {
        choice.playerChoice = event.target.id;
    }
    computerMove();
    let result = winner();
    displayScores();
    tagline.innerText = "Computer Choosed " + choice.computerChoice;
    displayResults(result);
    //hideResults();

}