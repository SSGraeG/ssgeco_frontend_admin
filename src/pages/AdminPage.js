import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const AdminPage = ({ isAdmin }) => {
  const [data, setData] = useState(null);
  const [companyUserCounts, setCompanyUserCounts] = useState({}); // 추가된 부분
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin');
        setData(response.data);

        // Check if response.data.user_counts is an array
        if (response.data.user_counts && typeof response.data.user_counts === 'object') {
          const userCounts = {};
          Object.keys(response.data.user_counts).forEach((companyId) => {
            userCounts[companyId] = response.data.user_counts[companyId];
          });
          setCompanyUserCounts(userCounts);
        } else {
          console.error('Invalid user_counts data:', response.data.user_counts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const userRole = localStorage.getItem('role');

  const renderTable = () => {
    if (!isAdmin && userRole !== '1') {
      return <p className="mt-4">You don't have permission to access this page.</p>;
    }

    if (!data || !data.users) {
      return <p className="mt-4">No data available</p>;
    }

    let filteredData };

  return (
    <div className="container mt-4">
      {isAdmin || userRole === '1' ? (
        <>
          <h2 className="mb-4">최종 관리자 대시보드</h2>
          {/* 기업별 유저 수를 출력하는 부분 */}
          {Object.keys(companyUserCounts).map((companyId) => (
            <p key={companyId}>
              {`기업 ${companyId}의 유저 테이블 레코드 수: ${companyUserCounts[companyId]}`}
            </p>
          ))}

          {renderTable()}
            <Link to="/" className="btn btn-primary mr-2">홈으로 이동</Link>
        </>
      ) : (
        <p className="mt-4">You don't have permission to access this page.</p>
      )}
    </div>
  );
};
export default AdminPage;
