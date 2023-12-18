import React from 'react';
import PropTypes from 'prop-types';
import whiteKing from '../assets/images/white_king.png';
import whiteQueen from '../assets/images/white_queen.png';
import whiteRook from '../assets/images/white_rook.png';
import whiteBishop from '../assets/images/white_bishop.png';
import whiteKnight from '../assets/images/white_knight.png';
import whitePawn from '../assets/images/white_pawn.png';
import blackKing from '../assets/images/black_king.png';
import blackQueen from '../assets/images/black_queen.png';
import blackRook from '../assets/images/black_rook.png';
import blackBishop from '../assets/images/black_bishop.png';
import blackKnight from '../assets/images/black_knight.png';
import blackPawn from '../assets/images/black_pawn.png';


function getImageForPiece(type, color) {
  const images = {
    'k': color === 'w' ? whiteKing : blackKing,
    'q': color === 'w' ? whiteQueen : blackQueen,
    'r': color === 'w' ? whiteRook : blackRook,
    'b': color === 'w' ? whiteBishop : blackBishop,
    'n': color === 'w' ? whiteKnight : blackKnight,
    'p': color === 'w' ? whitePawn : blackPawn,
  };

  return images[type];
}

function Piece({ type, color, onClick }) {
  const pieceImage = getImageForPiece(type, color);

  return (
    <div onClick={() => onClick(type)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <img src={pieceImage} alt={`${color} ${type}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </div>
  );
}

Piece.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Piece;