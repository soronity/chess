import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Board from './components/board'; // <-- Don't forget this
import apiClient from './apiClient';

function App() {
  
  // Initialize boardState as an 8x8 array filled with null values as an example
  const [boardState, setBoardState] = useState(
    Array(8).fill(null).map(() => Array(8).fill(null))
  );

  useEffect(() => {
    apiClient.get('/initialBoardState')
      .then(response => {
        setBoardState(response.data);
      })
      .catch(error => {
        console.error("Error fetching initial board state:", error);
      });
  }, []);

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Chess Game</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={8}>
          <Board boardState={boardState} />
        </Col>
        {/* ... */}
      </Row>
    </Container>
  );
}

export default App;
