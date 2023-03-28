import './input.scss';

import React from 'react';

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
