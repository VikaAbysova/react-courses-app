import './button.scss';

import React from 'react';

export const Button = ({ text, onClick, type, id }) => (
	<button type={type} onClick={onClick} id={id}>
		{text}
	</button>
);
