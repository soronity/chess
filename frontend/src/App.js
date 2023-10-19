import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Board from './components/Board';
import GameMenu from './components/GameMenu'; 
import apiClient from './apiClient';

function App() {
  const [boardState, setBoardState] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    apiClient.get('/board')
      .then(response => {
        console.log("Board state received from server:", JSON.stringify(response.data, null, 2));
        setBoardState(response.data);
      })
      .catch(error => {
        console.error("Error fetching initial board state:", error);
      });
  }, []);
  

  const movePiece = async (selectedSquare, destinationSquare) => {
    console.log(`Entering movePiece from ${selectedSquare} to ${destinationSquare}`);
  
    const payload = {
      from: selectedSquare,
      to: destinationSquare
    };
    
    console.log("Payload to send:", payload);
  
    try {
      console.log("About to send POST request to /move");
      const response = await apiClient.post('/move', payload);
      console.log("Received response:", response);
  
      if (response.data.status === 'success') {
        const newBoardState = response.data.board;
        setBoardState(newBoardState);
      } else {
        console.error("Invalid move", response.data.message);
      }
    } catch (error) {
      console.error("Error making the move", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  

  const resetBoard = () => {
    // Logic to reset the board goes here
  };
  
  const undoMove = () => {
    // Logic to undo the last move
  };

  const saveGame = () => {
    // Logic to save the current game state
  };

  const loadGame = () => {
    // Logic to load a saved game state
  };

  const openSettings = () => {
    // Logic to open settings dialog
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Chess Game</h1>
          <button onClick={toggleMenu}>Menu</button>
          {isMenuVisible && (
            <GameMenu 
              resetBoard={resetBoard} 
              undoMove={undoMove} 
              saveGame={saveGame} 
              loadGame={loadGame} 
              openSettings={openSettings} 
            />
          )}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={8}>
          {boardState ? <Board boardState={boardState} movePiece={movePiece} /> : "Loading..."}
        </Col>
      </Row>
    </Container>
  );
}


export default App;
