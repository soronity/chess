import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import Square from './Square';
import Piece from './Piece';

function Board({ boardState, movePiece }) {
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handlePieceClick = (pieceType, color, square) => {
    console.log(`Piece clicked: ${pieceType} of color ${color} at ${square}`);
    setSelectedSquare(square);
  };

  const handleSquareClick = (square) => {
    console.log(`Square clicked at ${square}`);
    if (!square) {
      console.warn("Square is null, likely an invalid click or markup issue");
      return;
    }
    if (selectedSquare) {
      movePiece(selectedSquare, square);
    }
  };

  return (
    <div>
      {boardState.map((row, rowIndex) => {
        // Debug log right here to check what's rendering.
        console.log(`Rendering row ${rowIndex}:`, row);
        
        return (
          <Row key={rowIndex}>
            {row.map((cell, colIndex) => {
              const piece = cell ? cell.type : null;
              const color = cell ? cell.color : null;
              const square = cell ? cell.square : `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
  
              // Debug log right here for each square.
              console.log(`Rendering square: ${square || 'null'}`);
    
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
