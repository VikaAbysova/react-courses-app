import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.scss';

export const Button = ({ children, type, onClick, id, disabled }) => (
  <button
    type={type}
    onClick={onClick}
    id={id}
    className={style.btn_default}
    disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'button']),
  id: PropTypes.string,
  disabled: PropTypes.bool,
};
