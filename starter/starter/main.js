// Step 1a - Select and store the gameboard element
const gameboard = document.querySelector('#gameboard');

// Step 1b - Select and store the score element
const score = document.querySelector('#score');

// Step 1c - Select and store the cards element
 const cards = document.querySelector('#cards');

// Step 1d - Select and store the message element
const message = document.querySelector('#message');

// Step 2 - Create an array of cards
const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

// Declaring card selections
let deck = [];


// Step 2a - Create a function to shuffle the deck
function shuffleDeck () {
  // Step 2b - Create a placeholder array
  let tmp = [];

  // // Step 2c - Iterate through card values 4 times
  for (let i = 0; i < 4; i++) {
  tmp = cardValues.slice(0);

    for(let x = 0; x < cardValues.length; x++) {

    // Step 2d - Using a conditional loop
      if (tmp.length != 0) {

        // Step 2e - Select a random card from the array
        let randomCard = Math.floor(Math.random() * tmp.length);

        if(tmp[randomCard] != null) {
          // Step 2f - Add the card to the deck array
          deck.push(tmp[randomCard]);
          tmp.splice(randomCard, 1);
        }
      }
    }
  }
}

// Step 2g - Call the shuffleDeck function
shuffleDeck();
let boardEmpty = deck.length;
dealCards();
 // Step 3a - Create an array to store 2 players
 let players = ["Player 1", "Player 2"];

 // Step 3b - Create a variable to store the current player
 let currentPlayer = 0; 

 // Step 3c - Create a variable to store the first selected card
let firstCard = null;
let secondCard = null;
let p1Score = 0;
let p2Score = 0;


function dealCards() {
   // Step 4 - Iterate through the deck and bind a click event to each one
  for(let p = 0; p < deck.length; p++) {
    // Step 4a - Create a new div element to be a card
    let cardEle = document.createElement('div');
    // Step 3b - Add a 'card' class to the class list on the new div element
    cardEle.classList.add('card');
    // Step 3c - Add a data value to the card with the card's value in it
    cardEle.dataset.value = deck[p];
    // Step 3c - Bind the cardSelected function
    cardEle.addEventListener('click', cardSelected );
    cards.appendChild(cardEle); 
  }
}
 
//  // Step 5 - Create a function to store the logic for when a card is selected
  function cardSelected(event) {
//    // Step 5a - Check if there is already a card selected
  if(firstCard == null && boardEmpty != 0) {
        firstCard = event.target;//.dataset.value
        console.log(firstCard.dataset.value);
        firstCard.classList.remove('card');
        firstCard.classList.add('flipped');
      }
      else {
      secondCard = event.target;
      console.log(secondCard.dataset.value);
      secondCard.classList.remove('card');
      secondCard.classList.add('flipped');
      // Step 6 - Compare the cards
      if(secondCard.dataset.value === firstCard.dataset.value) {
//         Step 6c - Add a point to the score for this player
//        ... += 1;
        console.log("matched!");
        firstCard.removeEventListener('click', cardSelected);
        firstCard = null;
        secondCard.removeEventListener('click', cardSelected);
        secondCard = null;
        // Step 6d - Tell the player to go again
        message.textContent = `Congratulations! Player ${currentPlayer + 1}, please go again!`;

        if(currentPlayer == 0) {
          p1Score = p1Score + 1;
          score1.textContent = p1Score;
          boardEmpty = boardEmpty - 2;
          if(boardEmpty == 0){
            evaluateBoard();
          }
        }
        else {
          p2Score = p1Score + 1;
          score2.textContent = p2Score;
          boardEmpty = boardEmpty - 2;
            if(boardEmpty == 0){
              evaluateBoard();
            }
          }
      }
      // Step 6b - Add a class to the 2 card elements
      // flipping them over
      else {
        console.log("no match!");
        // Step 6e - Provide a fail message to the player
        message.textContent = "Oh, so sorry!!! But yer' not psychic!";
        firstCard.classList.remove('flipped');
        firstCard.classList.add('card');
        secondCard.classList.remove('flipped');
        secondCard.classList.add('card');
        firstCard = null;
        secondCard = null;

        // Step 6f - Using a ternary, change players
        currentPlayer = (currentPlayer === 0) ? 1 : 0;
        message.textContent = `Player ${currentPlayer + 1}, your turn!`;
      }
    }
  }

   // Step 7 - Check if the board is full
   function evaluateBoard() {
    if(boardEmpty == 0) {
      console.log(p1Score);
      console.log(p2Score);
      // Step 7a - Check if one of the players has won
      if(p1Score > p2Score) {
        // Step 7b - Tell the player they've won
        // (use string interpolation to show which player you're addressing)
          console.log("setting player 1");
          message.textContent = `${players[0].toString()}, you won!!! Congratulations!`;
      }
      else if(p2Score > p1Score) {
        message.textContent = `${players[1].toString()}, you won!!! Congratulations!`;
      }
      else {
        // Step 7c - Tell the players that the game has ended in a tie
        message.textContent = "The game was a tie! Nice try!";
      }
    }
  }


// Take it further - Reset the board allowing the user to play again (Worth 20% of the final grade)
  /*Step 1 - You will need a reset button in index.html
  Step 2 - You will need to bind an event listener that detects the click and executes a function*/
  resetBoard.addEventListener('click', function() {       
  //     /*Step 3 - You will need to reset all the pieces on the board*/
  tmp = [];
  deck = [];
  boardEmpty = 52;

  document.querySelectorAll('.flipped').forEach(function (ele) {
    ele.classList.remove('flipped');
    ele.classList.add('card');
  });
  //       // Step 5 - You will need to reset the players 
  currentPlayer = 0;
  p1Score = 0;
  score1.textContent = p1Score;
  p2Score = 0;
  score2.textContent = p2Score;
  //       //   Step 4 - You will need to reset the messages
  message.textContent = `Player ${currentPlayer + 1}, it's your turn!`;
  }
  );


