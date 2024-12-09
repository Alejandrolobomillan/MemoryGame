import React from "react";

function Card({ index, value, isFlipped, onClick, image }) {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={() => onClick(index)}>
      {isFlipped ? <img src={image} alt={`Card ${value}`} /> : null}
    </div>
  );
}

export default Card;
