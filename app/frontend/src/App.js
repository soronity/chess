import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Board from "./components/Board";
import GameMenu from "./components/GameMenu";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:3001");

function App() {
  const [boardState, setBoardState] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    console.log("Establishing socket connection...");

    socket.on("board", (newBoardState) => {
      console.log("Received new board state:", newBoardState);
      setBoardState(newBoardState);
    });

    // Clean up
    return () => {
      console.log("Disconnecting socket...");
      socket.disconnect();
    };
  }, []);

  const movePiece = (selectedSquare, destinationSquare) => {
    const payload = {
      from: selectedSquare,
      to: destinationSquare,
    };
    socket.emit("move", payload);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const resetBoard = () => {
    socket.emit("reset");
  };

  const undoMove = () => {
    socket.emit("undo");
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Chess Game</h1>
          <button onClick={toggleMenu}>Menu</button>
          {isMenuVisible && (
            <GameMenu resetBoard={resetBoard} undoMove={undoMove} />
          )}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={8}>
          {boardState ? (
            <Board boardState={boardState} movePiece={movePiece} />
          ) : (
            "Loading..."
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
