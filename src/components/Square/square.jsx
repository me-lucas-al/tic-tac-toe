import Button from "react-bootstrap/Button";
import styles from "./square.module.css";

export default function Square({ value, onSquareClick }) {
  return (
    <Button
      variant="outline-light"
      className={`${styles.square} ${
        value === "X" ? styles.x : value === "O" ? styles.o : ""
      }`}
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}
