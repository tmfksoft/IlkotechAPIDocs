import React, { Component } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/img/logo_white.png';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="headerLogo">
            <img src={Logo} className="headerLogo"/>
        </div>
        <div className="banner">API Documentation</div>
      </div>
    );
  }
}

export default Header;
