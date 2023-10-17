import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import Square from './square';
import Piece from './piece';

function Board({ boardState, movePiece }) {
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handlePieceClick = (pieceType, x, y) => {
    console.log(`Piece clicked: ${pieceType} at ${x}, ${y}`);
    setSelectedSquare({ x, y, type: pieceType });
  };

  const handleSquareClick = (x, y) => {
    console.log(`Square clicked at ${x}, ${y}`);
    if (selectedSquare) {
      movePiece(selectedSquare, { x, y }); // Move piece directly
    }
  };

  return (
    <div>
      {boardState.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((piece, colIndex) => (
            <Square 
              key={colIndex} 
              isDark={(rowIndex + colIndex) % 2 === 1}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
              selected={selectedSquare && selectedSquare.x === rowIndex && selectedSquare.y === colIndex}>
              {piece ? <Piece type={piece} onClick={() => handlePieceClick(piece, rowIndex, colIndex)} /> : null}
            </Square>
          ))}
        </Row>
      ))}
    </div>
  );
}

export default Board;
