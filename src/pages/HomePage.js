// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 파일을 import

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // localStorage에서 토큰을 가져와서 로그인 상태를 확인
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 간주
  }, []);

  const handleLogout = () => {
    // 로그아웃 시 localStorage에서 토큰 제거
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="container mt-5">
      <h1>관리자 페이지 3조</h1>
      <img src="/static/homeimg.jpg" alt="Welcome" className="img-fluid rounded my-3" />

      <p>관리자 페이지 입니다.</p>
      <nav>
        <ul className="list-inline">
          {isLoggedIn ? (
            // 로그인 상태일 때 로그아웃 버튼 표시
            <li className="list-inline-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          ) : (
            // 로그인 상태가 아닐 때 로그인 및 회원가입 버튼 표시
            <>
              <li className="list-inline-item">
                <Link to="/login" className="btn btn-primary">
                  로그인
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/signup" className="btn btn-success">
                  회원가입
                </Link>
              </li>
            </>
          )}
          <li className="list-inline-item">
            <Link to="/admin" className="btn btn-warning">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
