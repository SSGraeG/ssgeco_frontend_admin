import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate 사용
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyId, setCompanyId] = useState(null); // 새로운 state 추가
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedCompanyId = localStorage.getItem('company_id');

    setIsLoggedIn(!!token);
    setCompanyId(storedCompanyId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('company_id');
    setIsLoggedIn(false);
    setCompanyId(null); // 로그아웃 시 company_id를 null로 설정
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1>관리자 페이지 3조 {companyId && `company_id: ${companyId}`}</h1>
      <img src="/static/homeimg.jpg" alt="Welcome" className="img-fluid rounded my-3" />

      <p>관리자 페이지 입니다.</p>
      <nav>
        <ul className="list-inline">
          {isLoggedIn ? (
            <li className="list-inline-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          ) : (
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
