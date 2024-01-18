// Home.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Logo from './Logo'; // Logo 컴포넌트를 import합니다
import { useSpring, animated } from 'react-spring';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const [showContent, setShowContent] = useState(false); // 새로운 상태 추가
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
          const response = await axios.get(`${URL}/api/getCompanyName/${storedCompanyId}`);
          setCompanyName(response.data.company_name);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogoAnimationEnd = () => {
    // 로고 애니메이션이 끝날 때 showLogo 상태를 업데이트하여 메인 콘텐츠가 나타나도록 합니다
    setShowLogo(false);
    setShowContent(true); // 홈 콘텐츠를 나타내는 상태를 활성화합니다
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('company_id');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setCompanyId(null);
    setRole('');
    navigate('/');
  };

  const handleAdminButtonClick = () => {
    if (role === '1') {
      navigate('/admin');
    } else {
      navigate('/rowadmin');
    }
  };

  const fadeAnimation = useSpring({
    opacity: showContent ? 1 : 0, // 투명도 설정 (showContent 상태에 따라 다르게 적용)
    from: { opacity: showLogo ? 1 : 0 }, // 초기 투명도 값 (showLogo 상태에 따라 다르게 적용)
    config: { duration: 2000 },
  });

  return (
    <animated.div style={{ ...fadeAnimation, backgroundColor: '#add8e6', padding: '20px', borderRadius: '100px' }} className="container mt-5 text-center">
      {showLogo && <Logo onAnimationEnd={handleLogoAnimationEnd} />}
      {/* showContent 상태가 true일 때만 홈화면을 렌더링합니다 */}
      {showContent && (
        <>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
            관리자 페이지 test <br /> {companyName && `"${companyName}"의 관리자 계정입니다. `}
          </h1>
          <img src="/static/homeimg.jpg" alt="Welcome" className="img-fluid rounded my-3" />

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
                  <li className="list-inline-item ml-3">
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
                  <li className="list-inline-item ml-3">
                    <Link to="/signup" className="btn btn-success">
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </>
      )}
    </animated.div>
  );
};

export default Home;