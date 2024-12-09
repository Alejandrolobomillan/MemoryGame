import React from "react";

function Stats({ moves, timer }) {
  return (
    <div className="stats">
      <p>Movimientos: {moves}</p>
      <p>Tiempo: {timer} segundos</p>
    </div>
  );
}

export default Stats;
