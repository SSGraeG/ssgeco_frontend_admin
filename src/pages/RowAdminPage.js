import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RowAdminPage = () => {
  const [userData, setUserData] = useState([]);
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
            'Company-ID': company_id,  // 이 부분 추가
          },
        });
  
        // 데이터 처리
        setUserData(response.data.users);
  
        // ... (이전 코드)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [company_id]);
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
    </div>
  );
};

export default RowAdminPage;
