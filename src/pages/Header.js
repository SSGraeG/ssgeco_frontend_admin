// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse justify-content-end"> {/* justify-content-end로 변경 */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="navbar-brand" to="/">🌿 홈</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">📖 소개</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">📞 연락처</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;