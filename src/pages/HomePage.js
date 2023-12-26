import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedCompanyId = localStorage.getItem('company_id');
  
        setIsLoggedIn(!!token);
        setCompanyId(storedCompanyId);
  
        if (token && storedCompanyId) {
          // 여기에서 axios로 서버에 company_name을 가져오는 API를 호출합니다.
          const response = await axios.get(`http://localhost:5000/api/getCompanyName/${storedCompanyId}`);
  
          // Debugging: Log the response data to the console
          console.log('Response Data:', response.data);
  
          // 가져온 데이터에서 company_name을 추출하여 state에 설정합니다.
          setCompanyName(response.data.company_name);
        }
      } catch (error) {
        // Debugging: Log any errors to the console
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('company_id');
    setIsLoggedIn(false);
    setCompanyId(null);
    navigate('/');
  };

  const handleAdminButtonClick = () => {
    if (companyId === '1') {
      navigate('/admin');
    } else {
      navigate('/rowadmin');
    }
  };

  return (
    <div className="container mt-5">
      <h1>관리자 페이지 3조 <br></br> {companyName && `"${companyName}"의 관리자 계정입니다. `}</h1>
      <img src="/static/homeimg.jpg" alt="Welcome" className="img-fluid rounded my-3" />

      <p>관리자 페이지입니다.</p>
      <nav>
        <ul className="list-inline">
          {isLoggedIn ? (
            <>
              <li className="list-inline-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  로그아웃
                </button>
              </li>
              <li className="list-inline-item">
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
              <li className="list-inline-item">
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
