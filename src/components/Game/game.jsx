import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Board from "../Board/board";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./game.module.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [roundOverStatus, setRoundOverStatus] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isDraw = currentSquares.every((square) => square !== null) && !winner;

  useEffect(() => {
    if (winner) {
      setRoundOverStatus(`🏆 Vencedor: ${winner}`);
      const prevSquares = history[history.length - 2];
      if (!prevSquares || !calculateWinner(prevSquares)) {
        setScores((prevScores) => ({
          ...prevScores,
          [winner]: prevScores[winner] + 1,
        }));
      }
    } else if (isDraw) {
      setRoundOverStatus("Deu velha!");
    }

    if (winner || isDraw) {
    setCountdown(3);
  }
}, [winner, isDraw, history]);

  useEffect(() => {
  if (countdown === null) return;

  if (countdown === 0) {
    handleRestartRound();
    return;
  }

  const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
  return () => clearTimeout(timer);
}, [countdown]);

  function handlePlay(nextSquares) {
    if (winner || isDraw) return;
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleRestartRound() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setCountdown(null);
    setRoundOverStatus(null);
  }

  function handleRestartGame() {
    handleRestartRound();
    setScores({ X: 0, O: 0 });
  }

  return (
    <Container className={styles.container}>
      <Row>
        <Col className={styles.col}>
          <div className={styles.game}>
            <div className={styles.gameBoard}>
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
                scores={scores}
                roundOverStatus={roundOverStatus}
                countdown={countdown}
              />
            </div>
            <div className={styles.gameInfo}>
              <Button
                className={styles.restartButton}
                variant="primary"
                onClick={handleRestartRound}
              >
                Reiniciar Rodada
              </Button>
              <Button
                className={styles.restartButton}
                variant="secondary"
                onClick={handleRestartGame}
              >
                Reiniciar Jogo
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
