import React, { useState } from 'react';
import Card from "./Card";
import "./Neumorphism.css";

function App() {
  const cards = ["A♥", "K♠", "Q♣", "J♦", "10♥"];

  const [player1, setPlayer1] = useState({
    cards: [], // Cards in hand
    score: 0,  // Number of cards won
  });
  
  const [player2, setPlayer2] = useState({
    cards: [],
    score: 0,
  });
  // -------- Players initializaion ------
  const [turn, setTurn] = useState(null); // Tracks whose turn it is ('player1' or 'player2')
  const [deck, setDeck] = useState([]);  // Holds shuffled cards
  const [gameStarted, setGameStarted] = useState(false); // Tracks if the game is active
  
  const shuffleDeck = () => {
    const cards = Array.from({ length: 10 }, (_, i) => i + 1);
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  // -------- Players initializaion END ------
  
  // ------- Defining Start Game Function -------
  const startGame = () => {
    const shuffledDeck = shuffleDeck();
    setPlayer1({
      cards: shuffledDeck.slice(0, 5),
      score: 0,
    });
    setPlayer2({
      cards: shuffledDeck.slice(5),
      score: 0,
    });
    setTurn(shuffledDeck.includes(10) ? 'player1' : 'player2'); // First player with 10 starts
    setGameStarted(true);
  };

  // ------- Defining Start Game Function END -------


  //let array = [1,2,3,4,4,5,6] -> let altArray = [...array]
  // 1 -> 5, 2 -> 7

  const playCard = (player, cardIndex) => {
    if (turn !== player) return; // Only the current player's turn
    
    const playerCards = player === 'player1' ? [...player1.cards] : [...player2.cards];
    const opponent = player === 'player1' ? player2 : player1;
  
    const playedCard = playerCards.splice(cardIndex, 1)[0];
    const opponentPlayedCard = opponent.cards[0]; // For simplicity, opponent plays the first card
  
    if (playedCard > opponentPlayedCard) {
      // Current player wins the round
      const updatedPlayer = player === 'player1' ? player1 : player2;
      updatedPlayer.score += 2;
      if (player === 'player1') setPlayer1(updatedPlayer);
      else setPlayer2(updatedPlayer);
    }
  
    // Update turn and state
    if (player === 'player1') setPlayer1({ ...player1, cards: playerCards });
    else setPlayer2({ ...player2, cards: playerCards });
  
    // Switch turns
    setTurn(player === 'player1' ? 'player2' : 'player1');
  };


  const resetGame = () => {
    setPlayer1({ cards: [], score: 0 });
    setPlayer2({ cards: [], score: 0 });
    setTurn(null);
    setDeck([]);
    setGameStarted(false);
  };

  const renderCards = (player) => {
    const cards = player === 'player1' ? player1.cards : player2.cards;
    return cards.map((card, index) => (
      <div
        key={index}
        className="card"
        onClick={() => playCard(player, index)} // Handle card click
        style={{
          opacity: turn === player ? 1 : 0.5, // Highlight current player's turn
        }}
      >
        {card}
      </div>
    ));
  };
  
  

  return (
    <div className="app-container">
      {!gameStarted ? (
        <button onClick={startGame}>Start Game(from scoring-system)</button>
      ) : (
        <>
          <div className="player">
            <h2>Player 1</h2>
            <p>Score: {player1.score}</p>
            <div className="cards-container">{renderCards('player1')}</div>
          </div>
  
          <div className="player">
            <h2>Player 2</h2>
            <p>Score: {player2.score}</p>
            <div className="cards-container">{renderCards('player2')}</div>
          </div>
  
          <button onClick={resetGame}>Reset Game</button>
        </>
      )}
    </div>
  );
  
}

export default App;
