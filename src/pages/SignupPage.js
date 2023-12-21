import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [industryCategory, setIndustryCategory] = useState('Other');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const navigate = useNavigate();

  const handleStartDateChange = (e) => {
    const enteredStartDate = e.target.value;
    setStartDate(enteredStartDate);

    // Automatically calculate expiration date: 1 year later
    const dateObject = new Date(enteredStartDate);
    dateObject.setFullYear(dateObject.getFullYear() + 1);

    // Format the date to be sent to the server
    const formattedExpirationDate = dateObject.toISOString().split('T')[0];
    setExpirationDate(formattedExpirationDate);
  };

  const handleSignup = async () => {
    try {
      if (username && userId && userPwd && contactNumber && startDate) {
        const response = await axios.post('http://localhost:5000/login/signup', {
          userId: userId,
          userPwd: userPwd,
          name: username,
          phone: contactNumber,
          start_date: startDate,
          industryCategory: industryCategory,
          isSubscribed: isSubscribed,
        });

        const token = response.data.token;
        alert('회원가입이 완료되었습니다.');

        // 토큰을 사용하는 로직을 추가할 수 있습니다.
        // 예: 로컬 스토리지에 토큰을 저장하거나, 상태로 관리할 수 있습니다.

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
    <div className="container mt-5">
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

        <Form.Group controlId="formIndustryCategory">
          <Form.Label>산업별 카테고리:</Form.Label>
          <Form.Control
            as="select"
            value={industryCategory}
            onChange={(e) => setIndustryCategory(e.target.value)}
          >
            <option value="Other">Other</option>
            <option value="Delivery">Delivery</option>
            <option value="ECumus">ECumus</option>
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
