import React from 'react';

const Card = props => {
  const { children, className } = props;

  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
