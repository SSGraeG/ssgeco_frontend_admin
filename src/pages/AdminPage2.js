import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from '../chart/DonutChart';
import PChart from '../chart/PChart';
// AiChart 및 InfraChart import 삭제

const AdminPage2 = ({ isAdmin, companyUserCounts }) => {
  const [data, setData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [DonutChartData, setDonutChartData] = useState({ win: 0, defeat: 0 });
  const [PChartData, setPChartData] = useState({ Delivery: 0, ECumus: 0, Other: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Requesting data from the server...'); // 추가된 로그
        const response = await axios.get('https://localhost:5000/api/get_data');
        console.log('Data received from the server:', response.data); // 추가된 로그
        setData(response.data);

        // 기존 코드에서 구독자 및 카테고리별 통계 추출

        const subCount = response.data.users.filter((user) => user.subscription_status === 'yes').length;
        const noSubCount = response.data.users.filter((user) => user.subscription_status === 'no').length;

        const c1Count = response.data.users.filter((user) => user.category === 'Delivery').length;
        const c2Count = response.data.users.filter((user) => user.category === 'ECumus').length;
        const c3Count = response.data.users.filter((user) => user.category === 'Other').length;

        setDonutChartData({ win: subCount, defeat: noSubCount });
        setPChartData({ Delivery: c1Count, ECumus: c2Count, Other: c3Count });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const userRole = localStorage.getItem('role');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleDeleteUser = async (email) => {
    try {
      const token = localStorage.getItem('token');

      // 서버에 사용자 삭제 요청
      await axios.delete(
        `https://localhost:5000/editor/customer/${email}`, // Update API endpoint
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log('Deleted User:', email);

      // 프론트엔드에서도 해당 사용자 삭제
      setData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.users = updatedData.users.filter((user) => user.email !== email);
        return updatedData;
      });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const renderTable = () => {
    if (!isAdmin && userRole !== '1') {
      return <p className="mt-4">You don't have permission to access this page.</p>;
    }

    if (!data || !data.users) {
      return <p className="mt-4">No data available</p>;
    }

    let filteredData;
    if (selectedTab === 'subscribed') {
      filteredData = data.users.filter((user) => user.subscription_status === 'yes');
    } else if (selectedTab === 'notSubscribed') {
      filteredData = data.users.filter((user) => user.subscription_status === 'no');
    } else {
      filteredData = data.users;
    }

    if (sortBy) {
      filteredData.sort((a, b) => {
        const aValue = sortBy === 'usersnum' ? parseInt(a.usersnum) : a[sortBy];
        const bValue = sortBy === 'usersnum' ? parseInt(b.usersnum) : b[sortBy];

        if (sortBy === 'registrationDate' || sortBy === 'end_date') {
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }

        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    return (
      <table className="table mt-4 table-striped table-bordered">
        <thead style={{ background: 'skyblue', color: 'white' }}>
          <tr>
            <th onClick={() => handleSort('company_name')}>사용자명</th>
            <th onClick={() => handleSort('usersnum')}>유저 수</th>
            <th onClick={() => handleSort('aiCategory')}>AI 적용</th>
            <th onClick={() => handleSort('infraCategory')}>인프라 선택</th>
            <th onClick={() => handleSort('email')}>이메일</th>
            <th onClick={() => handleSort('phone')}>연락처</th>
            <th onClick={() => handleSort('end_date')}>만료일</th>
            <th onClick={() => handleSort('category')}>산업별 카테고리</th>
            <th onClick={() => handleSort('subscription_status')}>구독여부</th>
            <th>해지</th> {/* 삭제 버튼이 추가된 열 */}
          </tr>
        </thead>
        <tbody>
        {filteredData.map((user, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>{user.company_name}</td>
              <td>{companyUserCounts[user.company_id]}</td>
              <td>{user.aiCategory}</td>
              <td>{user.infraCategory}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.end_date}</td>
              <td>{user.category}</td>
              <td>{user.subscription_status === 'yes' ? '구독 중' : '구독 안 함'}</td>
              <td>
          <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
        </td>
      </tr>
    </React.Fragment>
  ))}
</tbody>
      </table>
    );
  };

  return (
    <div className="container mt-4">
      {isAdmin || userRole === '1' ? (
        <>
            {/* 기업별 유저 수를 출력하는 부분
            {Object.keys(companyUserCounts).map((companyId) => (
              <p key={companyId}>
                {`기업 ${companyId}의 유저 테이블 레코드 수: ${companyUserCounts[companyId]}`}
              </p>
            ))} */}

          <h2 style={{ color: 'skyblue', fontWeight: 'bold' }}>최종 관리자 대시보드</h2>

          <div className="mb-4">
            <button className={`btn btn-info text-white mr-2 ${selectedTab === 'all' ? 'active' : ''}`} onClick={() => handleTabClick('all')}>전체</button>
            <button className={`btn btn-info text-white mr-2 ${selectedTab === 'subscribed' ? 'active' : ''}`} onClick={() => handleTabClick('subscribed')}>구독 중</button>
            <button className={`btn btn-info text-white mr-2 ${selectedTab === 'notSubscribed' ? 'active' : ''}`} onClick={() => handleTabClick('notSubscribed')}>구독 안 함</button>
            <button className="btn btn-info text-white mr-2" onClick={() => handleSort('usersnum')}>유저 수 정렬 {sortOrder === 'asc' ? '▲' : '▼'}</button>
            <button className="btn btn-info text-white mr-2" onClick={() => handleSort('end_date')}>만료일 정렬 {sortOrder === 'asc' ? '▲' : '▼'}</button>
          </div>




          {renderTable()}

          <div className="row mt-4">
            <div className="col-md-3">
              <div className="mb-4">
                <h4 className="text-center">구독자 비율 차트</h4>
                <DonutChart win={DonutChartData.win} defeat={DonutChartData.defeat} />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-4">
                <h4 className="text-center">카테고리별 비율 차트</h4>
                <PChart Delivery={PChartData.Delivery} ECumus={PChartData.ECumus} Other={PChartData.Other} />
              </div>
            </div>
            {/* AiChart 및 InfraChart 부분 삭제 */}
          </div>
        </>
      ) : (
        <p className="mt-4">You don't have permission to access this page.</p>
      )}
    </div>
  );
};

export default AdminPage2;