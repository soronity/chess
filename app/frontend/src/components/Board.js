import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import Square from './Square';
import Piece from './Piece';

function Board({ boardState, movePiece }) {
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handlePieceClick = (pieceType, color, square) => {
    setSelectedSquare(square);
  };

  const handleSquareClick = (square) => {
    if (!square) {
      return;
    }
    if (selectedSquare) {
      movePiece(selectedSquare, square);
      setSelectedSquare(null); // Reset the selected square
    }
  };

  return (
    <div>
      {boardState.map((row, rowIndex) => {
        return (
          <Row key={rowIndex}>
            {row.map((cell, colIndex) => {
              const piece = cell ? cell.type : null;
              const color = cell ? cell.color : null;
              const square = cell ? cell.square : `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
  
              return (
                <Square 
                  key={colIndex} 
                  isDark={(rowIndex + colIndex) % 2 === 1}
                  onClick={() => handleSquareClick(square)}
                  selected={selectedSquare === square}>
                  {piece ? 
                    <Piece 
                      type={piece} 
                      color={color} 
                      onClick={() => handlePieceClick(piece, color, square)} 
                    /> : null}
                </Square>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
}

export default Board;
