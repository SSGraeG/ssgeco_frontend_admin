import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedCompanyId = localStorage.getItem('company_id');
        const storedRole = localStorage.getItem('role');
  
        setIsLoggedIn(!!token);
        setCompanyId(storedCompanyId);
        setRole(storedRole);
  
        if (token && storedCompanyId) {
          const response = await axios.get(`http://localhost:5000/api/getCompanyName/${storedCompanyId}`);
          setCompanyName(response.data.company_name);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('company_id');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setCompanyId(null);
    setRole('');
    navigate('/');
    window.location.reload();
  };

  const handleAdminButtonClick = () => {
    if (role === '1') {
      navigate('/admin');
    } else {
      navigate('/rowadmin');
    }
  };

  return (
    <div className="container mt-5 text-center" style={{ backgroundColor: '#add8e6', padding: '20px', borderRadius: '100px' }}>
      <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
        관리자 페이지 3조 <br /> {companyName && `"${companyName}"의 관리자 계정입니다. `}
      </h1>
      <img src="/static/homeimg.jpg" alt="Welcome" className="img-fluid rounded my-3" / >

      <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
       SaaS 관리자 페이지 입니다 <br /> {companyName && `"${companyName}"의 관리자 계정입니다. `}
      </h1>
      <nav>
  <ul className="list-inline">
    {isLoggedIn ? (
      <>
        <li className="list-inline-item">
          <button className="btn btn-danger" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
        <li className="list-inline-item ml-3"> {/* 여기서 ml-3 클래스를 추가 */}
          <button className="btn btn-warning" onClick={handleAdminButtonClick}>
            Admin
          </button>
        </li>
      </>
    ) : (
      <>
        <li className="list-inline-item">
          <Link to="/login" className="btn btn-primary">
            로그인
          </Link>
        </li>
        <li className="list-inline-item ml-3"> {/* 여기서 ml-3 클래스를 추가 */}
          <Link to="/signup" className="btn btn-success">
            회원가입
          </Link>
        </li>
      </>
    )}
  </ul>
</nav>
    </div>
  );
};

export default Home;
