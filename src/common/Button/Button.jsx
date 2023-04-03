import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export const Button = ({ text, onClick, type, id }) => (
  <button type={type} onClick={onClick} id={id}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'button']),
  id: PropTypes.string,
};
