import React from 'react';
import { Row } from 'react-bootstrap';
import Square from './square';

function Board({ boardState }) {
  return (
    <div>
      {boardState.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((piece, colIndex) => (
            <Square 
              key={colIndex} 
              isDark={(rowIndex + colIndex) % 2 === 1} 
              piece={piece} 
            />
          ))}
        </Row>
      ))}
    </div>
  );
}

export default Board;
