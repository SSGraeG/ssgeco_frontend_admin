import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(to bottom right, #b0c4de, #87ceeb)', padding: '10px', boxShadow: '0px 5px 5px -5px #000000' }}>
      <div className="navbar-brand" style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>
        <Link to="/">📊 SSG-ECO</Link>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" style={{ marginLeft: '20px' }}>
            <Link className="nav-link" to="/" style={{ fontSize: '18px', color: 'white' }}>🌿 홈</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" style={{ fontSize: '18px', color: 'white' }}>📖 소개</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact" style={{ fontSize: '18px', color: 'white' }}>📞 연락처</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
