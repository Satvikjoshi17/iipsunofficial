import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/actionCreators/authActionCreator';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className='navbar'>
      <a href="https://www.dauniv.ac.in/" target='_blank' className='footer-text left' style={{ marginLeft: 50 + 'px' }}>
        <img src="/assets/favicon.ico" alt="Davv Logo" className='footer-logo' /> IIPS
      </a>
      <div className='hamburger' onClick={toggleMenu}>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
      </div>
      <div className={`navbar-container ${menuOpen ? 'open' : ''}`}>
        <div className='navbar-links'>
          {location.pathname === '/' && (
            <Link className='navbar-brand' to='/dashboard'>
              Academics
            </Link>
          )}
          {location.pathname !== '/' && (
            <Link className='navbar-brand' to='/'>
              Home
            </Link>
          )}
          <Link className='navbar-brand' to='/placement'>
            Placement
          </Link>
          <Link className='navbar-brand' to='/events'>
            Events
          </Link>
          <Link className='navbar-brand' to='/aboutus'>
            About
          </Link>
          <Link className='navbar-brand' to='/our-contributers'>
            Contributors
          </Link>
        </div>
        <ul className='navbar-nav'>
          {isAuthenticated ? (
            <>
              <li className='nav-item'>
                <p className='user-welcome'>
                  <span className='user-name'>{user.displayName?.toUpperCase()}</span>
                  <img className='user-icon' src="/assets/user-icon.png" alt="Admin" />
                </p>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <Link className='btnNew' to='/login'>
                  Sign In
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='btnNew' to='/Register'>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {menuOpen && <div  onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Navbar;
