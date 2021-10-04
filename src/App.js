import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import "./styles.css";

export default function App() {
  const { width, height } = useWindowSize();
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ]);

  const decideWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [6, 7, 8],
      [0, 4, 8]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        console.log("The winner is ", board[a]);
        return board[a];
      }
    }
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        board[0] &&
        board[1] &&
        board[2] &&
        board[3] &&
        board[4] &&
        board[5] &&
        board[6] &&
        board[7] &&
        board[8] !== null &&
        !(board[a] === board[b] && board[b] === board[c])
      ) {
        // console.log("The winner is ", board[a]);
        return draw();
      }
    }
    return null;
  };

  decideWinner(board);

  const [isXTurn, setIsXTurn] = useState(true);
  const winner = decideWinner(board);

  const handleClick = (index) => {
    console.log("clicked", index);

    if (winner === null && board[index] === null) {
      let boardCopy = [...board];
      boardCopy[index] = isXTurn ? "X" : "O";
      setBoard(boardCopy);
      setIsXTurn(!isXTurn);
    }
  };

  const restart = () => {
    setBoard([null, null, null, null, null, null, null, null, null]);
    setIsXTurn(true);
  };

  return (
    <div className="App">
      <h1>--😀 Welcome 😀--</h1>

      <h1>Tic tac toe</h1>
      <div>
        <button onClick={restart}>Restart </button>
      </div>
      <h2>Player X will start the Game</h2>

      {winner ? <h2>The winner is : {winner}</h2> : " "}

      {winner ? <Confetti width={width} height={height} /> : ""}

      <div className="board">
        {board.map((value, index) => (
          <Box value={value} onPlayerClick={() => handleClick(index)} />
        ))}
      </div>
    </div>
  );
}

function Box(props) {
  //const [value, setValue] = useState(null);
  return (
    <div
      // onClick={() => setValue(props.value === "X" ? "o" : "X")}
      onClick={props.onPlayerClick}
      style={{ color: props.value === "X" ? "blue" : "crimson" }}
      className="game-box"
    >
      {props.value}
    </div>
  );
}

function draw() {
  return <h2>Match Draw</h2>;
}
