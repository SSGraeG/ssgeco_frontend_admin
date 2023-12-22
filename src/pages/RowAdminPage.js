import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RowAdminPage = () => {
  const [userData, setUserData] = useState([]);
  const [couponName, setCouponName] = useState('');
  const [usepoint, setUsepoint] = useState('');
  const { company_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // localStorage에서 토큰과 company_id 가져오기
        const token = localStorage.getItem('token');
        const company_id = localStorage.getItem('company_id');

        // 요청 시 헤더에 company_id 설정
        const response = await axios.get(`http://localhost:5000/rowadmin`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': company_id,
          },
        });

        // 데이터 처리
        setUserData(response.data.users);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [company_id]);

  const handleCreateCoupon = async () => {
    try {
      // localStorage에서 토큰과 company_id 가져오기
      const token = localStorage.getItem('token');
      const company_id = localStorage.getItem('company_id');

      // 요청 시 헤더에 company_id 설정
      const response = await axios.post(
        `http://localhost:5000/company/user/coupon`,
        {
          name: couponName,
          usepoint: usepoint,
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

      // 생성한 쿠폰 정보를 사용하여 원하는 방식으로 처리
      // ...

    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>User Data for Company {company_id}</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
        </table>

<h2>Create Coupon</h2>
<div>
  <label>Coupon Name:</label>
  <input
    type="text"
    value={couponName}
    onChange={(e) => setCouponName(e.target.value)}
  />
</div>
<div>
  <label>Usepoint:</label>
  <input
    type="number"
    value={usepoint}
    onChange={(e) => setUsepoint(e.target.value)}
  />
</div>
<button onClick={handleCreateCoupon}>Create Coupon</button>
</div>
);
};

export default RowAdminPage;