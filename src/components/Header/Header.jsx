import React from 'react';
import { Button } from 'common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_TEXT } from 'contstants';
import './header.scss';

export const Header = () => {
  const userName = 'Viktoriya';

  return (
    <>
      <header className="header">
        <Logo />
        <div className="header-body">
          <p className="user-name">{userName}</p>
          <Button type="button">Logout</Button>
        </div>
      </header>
    </>
  );
};
