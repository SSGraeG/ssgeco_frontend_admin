// SignupPage.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (userId && userPwd) {
        const response = await axios.post('http://localhost:5000/login/signup', {
          userId: userId,
          userPwd: userPwd,
                });

        const token = response.data.token;
        alert('회원가입이 완료되었습니다.');

        // 토큰을 사용하는 로직을 추가할 수 있습니다.
        // 예: 로컬 스토리지에 토큰을 저장하거나, 상태로 관리할 수 있습니다.

        navigate('/');
      } else {
        alert('사용자 이름과 비밀번호를 모두 입력하세요');
      }
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>회원가입</h2>
      <Form>
        <Form.Group controlId="formUserId">
          <Form.Label>사용자 아이디:</Form.Label>
          <Form.Control type="text" placeholder="사용자 아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formUserPwd">
          <Form.Label>비밀번호:</Form.Label>
          <Form.Control type="password" placeholder="비밀번호" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={handleSignup}>
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default SignupPage;