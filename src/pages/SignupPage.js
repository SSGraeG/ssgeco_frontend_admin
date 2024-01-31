import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../BaseURL';
import '../css/login.css'; // Import the login.css for styling
import Swal from 'sweetalert2'; // Import SweetAlert

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
        }, {
          timeout: 30000, // 타임아웃을 10초로 설정 (원하는 시간으로 조절 가능)
          // 다른 옵션들도 필요한 경우 여기에 추가
        });
  
        // Use SweetAlert for success message
        Swal.fire({
          title: '회원가입이 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
  
        navigate('/');
      } else {
        // Use SweetAlert for validation error
        Swal.fire({
          title: '모든 필드를 입력하세요.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    } catch (error) {
      console.error('회원가입 실패', error);
  
      // Check if the error response contains a message
      const errorMessage = error.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.';
  
      // Use SweetAlert to display the error message
      Swal.fire({
        title: errorMessage,
        icon: 'error',
        confirmButtonText: '확인',
      });
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
          <h2 className="title">회원가입</h2>

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
        </form>
      </div>
    </div>
  );
};

export default SignupPage;