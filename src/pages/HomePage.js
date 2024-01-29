import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useSpring, animated } from 'react-spring';
import Lottie from 'lottie-react';
import animationData from './json/Dash.json';
import '../css/Home.css';

const Home = () => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const [, setCompanyId] = useState(null);
  const infraCategory = localStorage.getItem('infraCategory'); // infraCategory를 localStorage에서 가져옴

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
          // 데이터를 가져오는 로직 추가
          // const response = await axios.get(`${URL}/api/getCompanyName/${storedCompanyId}`);
          // setCompanyName(response.data.company_name);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
  const bubbleElements = document.querySelectorAll('.bg-bubbles li');

  bubbleElements.forEach((bubble, index) => {
    bubble.classList.add('animate-bubble');
    bubble.style.animationDelay = `${index * 2}s`;
  });
}, []);

  const handleLogoAnimationEnd = () => {
    setShowLogo(false);
    setShowContent(true);
    setIsAnimationPlaying(false);
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
      if (infraCategory === 'Case 1') {
        navigate('/case1');
      } else if (infraCategory === 'Case 2') {
        navigate('/case2');}
        
    }
  };

  const fadeAnimation = useSpring({
    // 필요한 스타일링 추가
  });

  return (
    <animated.div
      style={{
        ...fadeAnimation,
        background: 'linear-gradient(to bottom right, #53e3a6, white)',
        minHeight: '100vh',
        padding: '20px',
        borderRadius: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // 변경된 부분: 이미지 상단 정렬
      }}
    >
      {showLogo && <Logo onAnimationEnd={handleLogoAnimationEnd} />}
      {showContent && (
        <>
         <div style={{ marginBottom: '10px', width: '40%', height: '40%' }}>
            <Lottie
              animationData={animationData}
              loop={isAnimationPlaying}
              onComplete={() => setIsAnimationPlaying(false)}
            />
          </div>

          <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', marginBottom: '0px' }}>
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