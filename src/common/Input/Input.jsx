import './input.scss';

import React from 'react';

import PropTypes from 'prop-types';

export const Input = ({
  labelText,
  placeholderText,
  onChange,
  inputType,
  inputName,
  inputValue,
  required,
  minLength,
  min,
}) => {
  return (
    <>
      <label htmlFor={inputName}>{labelText}</label>
      <input
        type={inputType}
        id={inputName}
        name={inputName}
        placeholder={placeholderText}
        value={inputValue}
        onChange={onChange}
        minLength={minLength}
        min={min}
        required={required}
      />
    </>
  );
};

Input.propTypes = {
  labelText: PropTypes.string,
  placeholderText: PropTypes.string,
  onChange: PropTypes.func,
  inputType: PropTypes.oneOf(['text', 'number', 'email', 'password']),
  inputName: PropTypes.string,
  inputValue: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.string,
  min: PropTypes.number,
};

// export default Input;
