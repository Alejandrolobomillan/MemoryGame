import React, { useState, useEffect } from "react";
import "./styles/memoryGame.css";
import Card from "./components/Card";
import Stats from "./components/Stats";

import img1 from "./assets/img1.svg";
import img2 from "./assets/img2.svg";
import img3 from "./assets/img3.svg";
import img4 from "./assets/img4.svg";
import img5 from "./assets/img5.svg";
import img6 from "./assets/img6.svg";
import img7 from "./assets/img7.svg";
import img8 from "./assets/img8.svg";
const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export function App() {

  /* DECLARACIÓ DE USESTATES */
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

  /* GENEREM LES CARTES I COMENÇEM EL JOC */

  const generateCards = (num) => {
    const initialCards = Array.from({ length: num }, (_, i) => Math.floor(i / 2));
    return [...initialCards].sort(() => Math.random() - 0.5);
  };
  const startGame = (numCards) => {
    setCards(generateCards(numCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setIsGameRunning(true);
  };

  /* REINICIEM EL JOC */

  const resetGame = () => {
    setCards(generateCards(0));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setIsGameRunning(false);
  };


  /* FLIP DE LES CARTES I COMPROVACIÓ DE LES PARELLES */

  const flipCard = (index) => {
    if (!isGameRunning || flippedCards.length >= 2 || flippedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (cards[first] === cards[second]) {
        setMatchedCards([...matchedCards, first, second]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
      setMoves((prev) => prev + 1);
    }
  };

  /* CONTROL DEL TEMPS I FINAL DEL JOC */

  useEffect(() => {
    if (isGameRunning) {
      const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isGameRunning]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsGameRunning(false);
      alert(`¡Has ganado en ${moves} movimientos y ${timer} segundos!`);
    }
  }, [matchedCards, cards, moves, timer]);

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <div className="difficulty">
        <button onClick={() => startGame(8)}>Fácil (8 cartas)</button>
        <button onClick={() => startGame(12)}>Medio (12 cartas)</button>
        <button onClick={() => startGame(16)}>Difícil (16 cartas)</button>
      </div>
      <Stats moves={moves} timer={timer} />
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={index}
            index={index}
            value={card}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
            onClick={flipCard}
            image={images[card]} 
          />
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>Reiniciar Juego</button>
    </div>
  );
}
