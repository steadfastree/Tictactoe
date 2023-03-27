import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [next, setNext] = useState("X");
  const [gameOver, setGameover] = useState(false);

  const tieGameChecker = () => {
    for (let i = 0; i < 9; ++i) {
      if (squares[i] == "") return false;
    }
    return true;
  }; //전부 차있으면 무승부

  const hasWinner = () => {
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
    for (let i = 0; i < lines.length; ++i) {
      const [f, s, t] = lines[i];
      if (
        squares[f] != "" &&
        squares[f] == squares[s] &&
        squares[f] == squares[t]
      )
        return squares[f];
    }
    return false;
  };

  useEffect(() => {
    if (hasWinner() || tieGameChecker()) setGameover(true);
  }, [squares]); //계속 too many rendering 에러가 떠서 squares가 바뀔 때만 체크하도록 수정

  const handleClick = (i) => {
    if (hasWinner() || squares[i] != "") return;
    const sq = squares.slice();
    sq[i] = next;
    if (next === "X") setNext("O");
    else setNext("X");

    setSquares(sq);
  };

  const renderReset = (gameOver) => {
    if (gameOver)
      return (
        <button
          onClick={() => {
            setSquares(Array(9).fill(""));
            setNext("X");
            setGameover(false);
          }}
        >
          Game Reset!
        </button>
      ); //게임이 끝났으면 모든 State를 초기화하는 리셋 버튼 렌더링
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          handleClick(i);
        }} // 클릭 이벤트 발생시마다 리렌더링
      />
    );
  };
  let status = "Next player: " + next;
  if (hasWinner()) {
    status = "Winner: " + hasWinner();
  } else if (tieGameChecker()) {
    status = "Game Tied!";
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div>{renderReset(gameOver)}</div>
    </div> //리셋버튼 렌더링
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
