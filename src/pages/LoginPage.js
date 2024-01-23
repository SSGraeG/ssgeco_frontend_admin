import React, { useState, useEffect } from 'react';
import '../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../BaseURL';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // This effect will run when the component mounts and whenever the email or password state changes
    // If either the email or password has a value, hide the guide message
    const showGuide = !(email || password);
    const guideElements = document.querySelectorAll('.input-div > div > h5');
    guideElements.forEach((guideElement) => {
      guideElement.style.display = showGuide ? 'block' : 'none';
    });
  }, [email, password]);

  const handleLogin = async () => {
    try {
      if (email && password) {
        const response = await axios.post(`${URL}/login`, {
          email: email,
          password: password,
        });

        const { token, company_id, role } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('company_id', company_id);
        localStorage.setItem('role', role);

        alert('로그인이 완료되었습니다.');
        navigate('/');
      } else {
        alert('이메일과 비밀번호를 모두 입력하세요.');
      }
    } catch (error) {
      console.error('로그인 실패', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="container">
      <img className="wave" src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png" alt="wave" />
      <div className="img">
        <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/bg.svg" alt="background" />
      </div>
      <div className="login-content">
        <form>
          <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" alt="avatar" />
          <h2 className="title">Welcome</h2>
          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <input
                type="text"
                className="input"
                placeholder="E-Mail"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <input
                type="password"
                className="input"
                placeholder="Password"
                pattern=".{6,}"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="button" onClick={() => navigate('/signup')}>
            signup
          </button>
          <input type="submit" className="btn" value="Login" onClick={handleLogin} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
