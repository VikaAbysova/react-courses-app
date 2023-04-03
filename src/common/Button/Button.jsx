import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export const Button = ({ children, type, onClick, id }) => (
  <button type={type} onClick={onClick} id={id}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'button']),
  id: PropTypes.string,
};
