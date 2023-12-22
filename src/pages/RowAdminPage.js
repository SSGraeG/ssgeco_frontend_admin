import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RowAdminPage = () => {
  const [userData, setUserData] = useState([]);
  const { company_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // localStorage에서 토큰 가져오기
        const token = localStorage.getItem('token');
  
        // company_id를 사용하여 스키마 이름 생성
        const schemaName = `company_${company_id}`;
  
        // 요청 시 헤더에 company_id 설정
        const response = await axios.get(`http://localhost:5000/rowadmin`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': company_id,  // 이 부분 추가
          },
        });
  
        // 데이터 처리
        setUserData(response.data.users);
  
        // 기존의 요청에서 스키마를 변경하여 user 데이터 가져오기
        const userDataResponse = await axios.get(`http://localhost:5000/${schemaName}/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('User Data:', userDataResponse.data);
  
        // userDataResponse.data를 사용하여 원하는 방식으로 상태 업데이트
        // ...
  
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
