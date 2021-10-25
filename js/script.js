const letterGuess = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");
const chooseLetter = document.querySelector(".letter");
const remainingGuesses = document.querySelector(".remaining");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesSpan= document.querySelector(".remaining span");
const message = document.querySelector(".message");


//TEST WORD
let word = "magnolia";

//GUESSED LETTER ARRAY
let guessedLetters=[];

//REMAINING GUESSES
let leftoverGuesses=8;

//VOCABULARY WORD LIST
const getWord = async function(){
    const res = await fetch(
        'https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt'
        );
    const words = await res.text();
    //console.log(words);
    const wordArray = words.split("\n");
   // console.log(wordArray);
   const randomIndex = Math.floor(Math.random()*wordArray.length);
   word = wordArray[randomIndex].trim();
   placeholder(word);

};
//start the game
getWord();

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
    //Empty message paragraph
    message.innerText="";
    //Collect what is entered in the input
    const guess = chooseLetter.value;
    //MAKE SURE A VALUE IS 1 LETTER ONLY
    const goodGuess=letterInput(guess);
    
    if (goodGuess){
        //Got a letter to guess
        makeGuess(guess);
    }
    chooseLetter.value="";
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
        showGuessedLetters();
        leftoverGuessCount(guess);
        updateWordInProgress(guessedLetters);
        //console.log(guessedLetters);
    }
};

//SHOWING THE GUESSED LETTERS
const showGuessedLetters = function(){
    letterGuess.innerHTML="";
    for(const letter of guessedLetters){
        const li= document.createElement("li");
        li.innerText=letter;
        letterGuess.append(li);
    };
};

//UPDATE THE WORD PROGRESS
const updateWordInProgress = function(guessedLetters){
    const wordUpper=word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const wordReveal =[];
    for (const letter of wordArray){
        if(guessedLetters.includes(letter)){
            wordReveal.push(letter.toUpperCase());
        }else{
            wordReveal.push("●")
        }
    };
    wordInProgress.innerText= wordReveal.join("");
    checkWin();
};

//HOW MANY GUESSES DO HE OR SHE HAVE REMAINING?
const leftoverGuessCount =function(guess){
    const wordUpper = word.toUpperCase();
    if(!wordUpper.includes(guess)){
        message.innerText = `Oops, the mystery word has no ${guess}.`;
        leftoverGuesses-=1;
    }else{
        message.innerText=`The mystery word includes the letter ${guess}.`;
    }

    if(leftoverGuesses === 0){
        message.innerHTML =`Game over. The mystery word is <span class ="highlight"> ${word}</span>.`;
        startOver();
    }else if(leftoverGuesses === 1){
        remainingGuessesSpan.innerText=`${leftoverGuesses} guess`;
    }else
    remainingGuessesSpan.innerText =`${leftoverGuesses} guesses`;
};


//DID THE PLAYER WIN THE GAME?
const checkWin = function(){
    if(word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML='<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    }
};

//GAME OVER! START AGAIN!
const startOver = function(){
    guessButton.classList.add("hide");
    remainingGuesses.classList.add("hide");
    letterGuess.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//PLAY AGAIN BUTTON 
playAgainButton.addEventListener("click",function(){
    //reset all the original values, grabs new word
    message.classList.remove("win");
    guessedLetters=[];
    leftoverGuesses=8;
    remainingGuessesSpan.innerText=`${leftoverGuesses} guesses`;
    letterGuess.innerHTML= "";
    message.innerText= "";
    //Grab a new word
    getWord();

    //UI ELEMENTS THAT MUST SHOW
    guessButton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    letterGuess.classList.remove("hide");
    playAgainButton.classList.add("hide");
});
