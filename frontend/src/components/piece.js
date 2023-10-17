import React from 'react';
import PropTypes from 'prop-types';

function Piece({ type, onClick }) {
  return (
    <div onClick={() => onClick(type)}>
      {type}
    </div>
  );
}

Piece.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Piece;
