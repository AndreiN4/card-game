import React from "react";
import Card from "./Card";
import "./Neumorphism.css";

function App() {
  const cards = ["A♥", "K♠", "Q♣", "J♦", "10♥"];

  return (
    <div className="app-container">
      <h1 className="title">THE MOST LOGICAL GAME</h1>
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card key={index} content={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
