import './header.scss';

import React from 'react';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

import { BUTTON_TEXT } from '../../contstants';

export const Header = () => {
	const userName = 'Viktoriya';

	return (
		<>
			<header className='header'>
				<Logo />
				<div>
					<p>{userName}</p>
					<Button type='button' text={BUTTON_TEXT[0]} />
				</div>
			</header>
		</>
	);
};
