import React, { useState } from 'react';
import './header.scss';

export const Header = () => {
	const [state, setState] = useState();
	return (
		<>
			<h1 className='header'>Hello</h1>
		</>
	);
};
