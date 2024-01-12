import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../css/RowAdminPage.css'; // Import a CSS file for styling (create a new CSS file)
import { URL } from '../BaseURL';

const RowAdminPage = () => {
  const [userData, setUserData] = useState([]);
  const [couponName, setCouponName] = useState('');
  const [usepoint, setUsepoint] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [couponList, setCouponList] = useState([]);
  const [categoryList] = useState([
    { id: 1, name: 'Donation', category: 'Donation' },
    { id: 2, name: 'Coupon', category: 'Coupon' },
  ]);

  const { company_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const company_id = localStorage.getItem('company_id');

        const response = await axios.get(`${URL}/rowadmin`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': company_id,
          },
        });

        setUserData(response.data.users);

        const couponResponse = await axios.get(`${URL}/company/user/coupon`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': company_id,
          },
        });
        setCouponList(couponResponse.data.coupons);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [company_id]);

  const handleCreateCoupon = async () => {
    try {
      const token = localStorage.getItem('token');
      const company_id = localStorage.getItem('company_id');

      const response = await axios.post(
        `${URL}/company/user/coupon`,
        {
          name: couponName,
          usepoint: usepoint,
          category: selectedCategory,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': company_id,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Created Coupon:', response.data.coupon);

      const updatedCouponList = [...couponList, response.data.coupon];
      setCouponList(updatedCouponList);

    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const company_id = localStorage.getItem('company_id');

      const response = await axios.delete(
        `${URL}/company/user/${email}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': company_id,
          },
        }
      );

      console.log('Deleted User:', response.data);

      const updatedUserData = userData.filter((user) => user.email !== email);
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      const token = localStorage.getItem('token');
      const company_id = localStorage.getItem('company_id');

      const response = await axios.delete(
        `${URL}/company/user/coupon/${couponId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': company_id,
          },
        }
      );

      console.log('Deleted Coupon:', response.data);

      const updatedCouponList = couponList.filter((coupon) => coupon.id !== couponId);
      setCouponList(updatedCouponList);
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div className="admin-container" style={{ backgroundColor: 'beige' }}>
      <div className="admin-header">
      <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
       관리자 페이지<br /> 
      </h1>
        <Link to="/" className="home-link">
          <button className="home-button">Home</button>
        </Link>
      </div>

      <div className="admin-section">
        <h2>유저 정보 {company_id}</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>이메일</th>
              <th>이름</th>
              <th>휴대전화</th>
              <th>유저 삭제</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-section">
        <h2>쿠폰 생성</h2>
        <div className="coupon-form">
          <label>쿠폰 이름:</label>
          <input
            type="text"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value)}
          />

          <label>포인트 가격:</label>
          <input
            type="number"
            value={usepoint}
            onChange={(e) => setUsepoint(e.target.value)}
          />

          <label>카테고리:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">기부 & 할인 쿠폰 항목 선택</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.category}>
                {category.name}
              </option>
            ))}
          </select>

          <button onClick={handleCreateCoupon}>Create Coupon</button>
        </div>3.36.124.56
      </div>

      <div className="admin-section">
        <h2>현재 출시된 쿠폰 목록</h2>
        <ul className="coupon-list">
          {couponList.map((coupon) => (
            <li key={coupon.id}>
              {coupon.name} - {coupon.usepoint} - {coupon.category}
              <button onClick={() => handleDeleteCoupon(coupon.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RowAdminPage;
