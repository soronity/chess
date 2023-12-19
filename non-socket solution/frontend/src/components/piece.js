import React from 'react';
import PropTypes from 'prop-types';

const typeToUnicode = {
  'r': '♖',
  'n': '♘',
  'b': '♗',
  'q': '♕',
  'k': '♔',
  'p': '♙',
};

function Piece({ type, color, onClick }) {
  const symbol = color === 'b' ? typeToUnicode[type].toLowerCase() : typeToUnicode[type];

  return (
    <div onClick={() => onClick(type)}>
      {symbol}
    </div>
  );
}

Piece.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Piece;