import React from 'react';
import { Col } from 'react-bootstrap';

function Square({ isDark, children, selected, onClick }) {
  const style = {
    backgroundColor: selected ? 'red' : (isDark ? '#d18b47' : '#ffce9e'),
    height: '60px',
    width: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center' 
  };

  return (
    <Col style={style} onClick={onClick}>  {}
      {children}
    </Col>
  );
}

export default Square;
