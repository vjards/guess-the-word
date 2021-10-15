const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");
const guessLetter = document.querySelector(".letter");
const remainingGuesses = document.querySelector(".remaining");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessDisplay= document.querySelector(".remaining span");
const message = document.querySelector(".message");

//Our test word
const word = "magnolia";

//Display placeholders as symbols for the chosen word's letters
const placeholder = function(word){
    const letterPlaceholders =[];
    for (const letter of word){
        console.log(letter);
        letterPlaceholders.push(" ●");
    }
    wordInProgress.innerText =letterPlaceholders.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const guess = guessLetter.value;
    console.log(guess);
    guessLetter.value="";
});