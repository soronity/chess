import React from 'react';
import { Col } from 'react-bootstrap';

function Square({ isDark, children, selected, onClick }) { // Add 'onClick' as a prop
  const style = {
    backgroundColor: selected ? 'red' : (isDark ? '#d18b47' : '#ffce9e'),
    height: '60px',
    width: '60px'
  };

  return (
    <Col style={style} onClick={onClick}>  {/* Add onClick here */}
      {children}
    </Col>
  );
}

export default Square;
