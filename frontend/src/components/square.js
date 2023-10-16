import React from 'react';
import { Col } from 'react-bootstrap';

function Square(props) {
  const style = {
    backgroundColor: props.isDark ? '#d18b47' : '#ffce9e',
    height: '60px',
    width: '60px'
  };
  return (
    <Col style={style}>
      {props.piece}
    </Col>
  );
}


export default Square;
