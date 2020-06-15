import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

const Footer = props => {
  return (
    <footer className="d-print-none">
      <div className="constrainer">
        <div className="container py-3">
          <ul className="footer-links mb-3">
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/sponsor">Sponsor A Kea</NavLink>
            </li>
            <li>
              <NavLink to="/help">Help</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/licence">Licence/Copyright</NavLink>
            </li>
            <li>
              <NavLink to="/terms">Terms/Privacy</NavLink>
            </li>
            <li>
              <a href="https://blog.keadatabase.nz">Blog</a>
            </li>
          </ul>
          <p className="footer-attribution">
            Kea Database data hosted in New Zealand on{' '}
            <a
              href="https://www.catalyst.net.nz/products/gis-core"
              target="_blank"
              rel="noopener noreferrer"
              className="catalyst"
            >
              Catalyst GIS Core
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
