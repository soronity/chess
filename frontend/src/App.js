import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Board from './components/board'; // <-- Don't forget this
import apiClient from './apiClient';

function App() {
  
  // Initialize boardState as an 8x8 array filled with null values as an example
  const [boardState, setBoardState] = useState(
    [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],  // Black back rank
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],  // Black pawns
      [null, null, null, null, null, null, null, null], // empty squares
      [null, null, null, null, null, null, null, null], // ...
      [null, null, null, null, null, null, null, null], // ...
      [null, null, null, null, null, null, null, null], // ...
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],  // White pawns
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']   // White back rank
    ]
  );

  useEffect(() => {
    apiClient.get('/board')
      .then(response => {
        setBoardState(response.data);
      })
      .catch(error => {
        console.error("Error fetching initial board state:", error);
      });
  }, []);

  const movePiece = async (selectedSquare, destinationSquare) => {
    console.log("Entering movePiece with:", selectedSquare, destinationSquare); // Debug line
  
    // Construct the payload
    const payload = {
      from: { x: selectedSquare.x, y: selectedSquare.y },
      to: { x: destinationSquare.x, y: destinationSquare.y },
    };
    
    console.log("Payload to send:", payload); // Debug line
  
    try {
      console.log("About to send POST request to /move"); // Debug line
      const response = await apiClient.post('/move', payload);
      console.log("Received response:", response); // Debug line
  
      if (response.data.status === 'success') {
        // Update the board with the new state
        const newBoardState = response.data.board;
        setBoardState(newBoardState);
      } else {
        console.error("Invalid move", response.data.message);
      }
    } catch (error) {
      console.error("Error making the move", error);
    }
  };
  

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Chess Game</h1>
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
