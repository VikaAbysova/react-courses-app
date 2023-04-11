import './button.scss';

import React from 'react';

import PropTypes from 'prop-types';

export const Button = ({ text, onClick, type, id, disabled, className }) => (
  <button
    type={type}
    onClick={onClick}
    id={id}
    disabled={disabled}
    className={className}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'button']),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
