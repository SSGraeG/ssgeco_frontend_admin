import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../BaseURL';
import '../css/login.css';

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

        const { token, company_id, role, subscription_status,infraCategory } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('company_id', company_id);
        localStorage.setItem('role', role);
        localStorage.setItem('subscription_status', subscription_status); // 이 부분을 추가
        localStorage.setItem('infraCategory', infraCategory); //  추가

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
          
          <Form.Group controlId="formEmail">
            <Form.Label>이메일:</Form.Label>
            <Form.Control type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>비밀번호:</Form.Label>
            <Form.Control type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" onClick={handleLogin}>
            로그인
          </Button>
          
          <button type="button" onClick={() => navigate('/signup')}>
            signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
