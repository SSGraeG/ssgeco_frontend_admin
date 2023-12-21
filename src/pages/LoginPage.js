import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setAdminStatus }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (email && password) {
        const response = await axios.post('http://localhost:5000/login', {
          email: email,
          password: password,
        });

        const token = response.data.token;
        localStorage.setItem('token', token);

        alert('로그인이 완료되었습니다.');
        navigate('/'); // 로그인 성공 시 어드민 페이지로 이동
      } else {
        alert('이메일과 비밀번호를 모두 입력하세요.');
      }
    } catch (error) {
      console.error('로그인 실패', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>로그인</h2>
      <Form>
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
      </Form>
    </div>
  );
};

export default LoginPage;
