import './button.scss';

import React from 'react';

import PropTypes from 'prop-types';

export const Button = ({ text, onClick, type, id }) => (
	<button type={type} onClick={onClick} id={id}>
		{text}
	</button>
);

Button.propTypes = {
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['submit', 'button']),
	id: PropTypes.string,
};
