import React from 'react';

import ghIcon from '../assets/github.svg';

import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <p>
        Made by
        {' '}
        <strong><a href="https://github.com/xinweny">xinweny</a></strong>
        {' '}
        in 2023
      </p>
      <a href="https://github.com/xinweny/where-is-wally">
        <img src={ghIcon} alt="Github" />
      </a>
    </footer>
  );
}

export default Footer;
