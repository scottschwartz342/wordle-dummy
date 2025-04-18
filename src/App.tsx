import "./App.css";
import { useState, useEffect } from "react";
import { WordleGame } from "./WordleGame";
import {
  SquareProps,
  DialogueProps,
  BoardRowProps,
  Board,
} from "./HelperFunctionsAndTypes";

const game: WordleGame = new WordleGame();

function isAlpha(str: string): boolean {
  return str.length === 1 && /^[a-zA-Z]+$/.test(str);
}

function Square({ value }: SquareProps) {
  return <div className={`square ${value.color}`}>{value.letter}</div>;
}

function Dialogue({ message }: DialogueProps) {
  return <p className="dialogue">{message}</p>;
}

function BoardRow({ value }: BoardRowProps) {
  return (
    <div className="board-row">
      <Square value={value[0]} />
      <Square value={value[1]} />
      <Square value={value[2]} />
      <Square value={value[3]} />
      <Square value={value[4]} />
    </div>
  );
}

function App() {
  const [board, setSquares] = useState<Board>(game.board);
  const [message, setDialogue] = useState<string>(
    "Type out a 5-lettered guess and hit 'Enter'"
  );

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      console.log("Key pressed:", event.key);
      if (event.key === "Enter") {
        const { newBoard, newMessage } = game.enter();
        setSquares(newBoard);
        setDialogue(newMessage);
      } else if (event.key === "Backspace") {
        setSquares(game.delete());
      } else if (isAlpha(event.key)) {
        setSquares(game.add(event.key));
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  return (
    <div className="App" tabIndex={0}>
      <h1>Hello,</h1>
      <ul>
        <li>Black: not in the word</li>
        <li>Yellow: in the word but not in the correct spot </li>
        <li>Green: in the right spot</li>
        <li>Red: already guessed and is Black</li>
      </ul>
      <Dialogue message={message} />
      <BoardRow value={board[0]} />
      <BoardRow value={board[1]} />
      <BoardRow value={board[2]} />
      <BoardRow value={board[3]} />
      <BoardRow value={board[4]} />
      <BoardRow value={board[5]} />
    </div>
  );
}

export default App;
