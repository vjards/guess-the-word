const letterGuess = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");
const chooseLetter = document.querySelector(".letter");
const remainingGuesses = document.querySelector(".remaining");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessDisplay= document.querySelector(".remaining span");
const message = document.querySelector(".message");

//Our test word
const word = "magnolia";
const guessedLetters=[];

//DISPLAY LETTER PLACEHOLDERS
const placeholder = function(word){
    const letterPlaceholders =[];
    for (const letter of word){
        console.log(letter);
        letterPlaceholders.push(" ●");
    }
    wordInProgress.innerText =letterPlaceholders.join("");
};

placeholder(word);

//GUESS BUTTON
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText="";
    const guess = chooseLetter.value;
    const goodGuess=letterInput(guess);
    if (goodGuess){
        makeGuess(guess);
    }
    chooseLetter.value="";
    ;
});



//LETTER INPUT
const letterInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        //Is the input empty?
        message.innnerText="Enter a letter now.";
    }else if(input.length > 1){
        //More than one letter had been typed.
        message.innerText="Please enter only one letter.";
    }else if (!input.match(acceptedLetter)){
        //A special character or number had been typed.
        message.innerText ="Please enter only a letter from A-Z";
    }else{
        //1 letter is shown
        return input;
    }
};


//TIME TO GUESS LETTERS
const makeGuess=function(guess){
    guess= guess.toUpperCase();
    if(guessedLetters.includes(guess)){
        message.innerText="Letter already been guessed. Try Again.";
    }else{
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

