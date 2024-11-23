import React from "react";
import "./Neumorphism.css";

const Card = ({ content }) => {
  return (
    <div className="card">
      <div className="card-text">{content}</div>
    </div>
  );
};

export default Card;