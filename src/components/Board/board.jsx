import Square from "../Square/square";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./board.module.css";

export default function Board({
  xIsNext,
  squares,
  onPlay,
  scores,
  roundOverStatus,
  countdown,
}) {
  let status = "";
  if (roundOverStatus) {
    status = roundOverStatus;
  } else if (countdown !== null && countdown > 0) {
    status = `Nova rodada em ${countdown}...`;
  } else {
    status = `Próximo jogador: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(i) {
    if (squares[i] || roundOverStatus) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const renderSquare = (i) => (
    <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
  );

  return (
    <Card className={styles.boardContainer} bg="dark" text="white">
      <Card.Body>
        <div className={styles.scoreboard}>
          <h2>Placar</h2>
          <div className={styles.score}>
            <span>Jogador X: {scores.X}</span>
            <span>Jogador O: {scores.O}</span>
          </div>
        </div>
        <div className={styles.status}>{getStatusMessage()}</div>
        <Row className={styles.board}>
          {squares.map((square, index) => (
            <Col key={index} xs={4} className="p-1">
              <Square value={square} onSquareClick={() => handleClick(index)} />
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}
