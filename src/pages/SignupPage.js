import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../BaseURL';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [category, setCategory] = useState('Other');
  const [aiCategory, setAICategory] = useState('일회용기 세척 여부 AI');
  const [infraCategory, setInfraCategory] = useState('Case 1');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navigate = useNavigate();

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleSignup = async () => {
    try {
      if (username && userId && userPwd && contactNumber && startDate) {
        await axios.post(`${URL}/login/signup`, {
          userId: userId,
          userPwd: userPwd,
          name: username,
          phone: contactNumber,
          start_date: startDate,
          category: category,
          aiCategory: aiCategory,
          infraCategory: infraCategory,
          isSubscribed: isSubscribed,
        });
  
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      } else {
        alert('모든 필드를 입력하세요');
      }
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#f5f5dc', padding: '20px', borderRadius: '10px' }}>
      <h2>회원가입</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>이름:</Form.Label>
          <Form.Control type="text" placeholder="이름" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formUserId">
          <Form.Label>사용자 아이디:</Form.Label>
          <Form.Control type="text" placeholder="사용자 아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formUserPwd">
          <Form.Label>비밀번호:</Form.Label>
          <Form.Control type="password" placeholder="비밀번호" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formContactNumber">
          <Form.Label>연락처:</Form.Label>
          <Form.Control type="text" placeholder="연락처" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formStartDate">
          <Form.Label>시작일:</Form.Label>
          <Form.Control type="date" value={startDate} onChange={handleStartDateChange} />
        </Form.Group>

        <Form.Group controlId="formAICategory">
          <Form.Label>산업별 카테고리:</Form.Label>
          <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="ECumus">ECumus</option>
            <option value="Delivery">Delivery</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formAICategory">
          <Form.Label>AI 카테고리:</Form.Label>
          <Form.Control as="select" value={aiCategory} onChange={(e) => setAICategory(e.target.value)}>
            <option value="일회용기 세척 여부 AI">일회용기 세척 여부 AI</option>
            <option value="택배 테이프 제거 여부 AI">택배 테이프 제거 여부 AI</option>
            <option value="사람 인식 여부 AI">사람 인식 여부 AI</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formInfraCategory">
          <Form.Label>Infra 카테고리:</Form.Label>
          <Form.Control as="select" value={infraCategory} onChange={(e) => setInfraCategory(e.target.value)}>
            <option value="Case 1">Case 1</option>
            <option value="Case 2">Case 2</option>
            <option value="Case 3">Case 3</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formIsSubscribed">
          <Form.Check type="checkbox" label="구독 여부" checked={isSubscribed} onChange={(e) => setIsSubscribed(e.target.checked)} />
        </Form.Group>

        <Button variant="primary" onClick={handleSignup}>
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default SignupPage;
