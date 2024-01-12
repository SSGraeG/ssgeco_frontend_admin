import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from '../chart/DonutChart';
import PChart from '../chart/PChart';
import AiChart from '../chart/AiChart';
// import InfraChart from '../chart/InfraChart';
import { URL } from '../BaseURL';


const AdminPage2 = ({ isAdmin , companyUserCounts }) => {
  const [data, setData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [DonutChartData, setDonutChartData] = useState({ win: 0, defeat: 0 });
  const [PChartData, setPChartData] = useState({ Delivery: 0, ECumus: 0, Other: 0 });
  const [AiChartData, setAiChartData] = useState({ a1: 0, a2: 0, a3: 0 });
  // const [InfraChartData, setInfraChartData] = useState({ Case1: 0, Case2: 0, Case3: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/api/get_data`);
        setData(response.data);
  
        const subCount = response.data.users.filter((user) => user.subscription_status === 'yes').length;
        const noSubCount = response.data.users.filter((user) => user.subscription_status === 'no').length;
  
        const c1Count = response.data.users.filter((user) => user.category === 'Delivery').length;
        const c2Count = response.data.users.filter((user) => user.category === 'ECumus').length;
        const c3Count = response.data.users.filter((user) => user.category === 'Other').length;
  
        // const i1 = response.data.users.filter((user) => user.infraCategory === 'Case1').length;
        // const i2 = response.data.users.filter((user) => user.infraCategory === 'Case2').length;
        // const i3 = response.data.users.filter((user) => user.infraCategory === 'Case3').length;
  
        const a1 = response.data.users.filter((user) => user.aiCategory === '일회 용기 세척 여부 AI').length;
        const a2 = response.data.users.filter((user) => user.aiCategory === '택배 테이프 제거 여부 AI').length;
        const a3 = response.data.users.filter((user) => user.aiCategory === '사람 인식 여부 AI').length;
  
        setDonutChartData({ win: subCount, defeat: noSubCount });
        setPChartData({ Delivery: c1Count, ECumus: c2Count, Other: c3Count });
        setAiChartData({ a1: a1, a2: a2, a3: a3 });
        // setInfraChartData({ Case1: i1, Case2: i2, Case3: i3 });
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
        `${URL}/editor/customer/${email}`, // Update API endpoint
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
        <thead className="thead-dark">
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
            <tr key={index}>
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
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-4">
      {isAdmin || userRole === '1' ? (
    <>
        <h2 className="mb-4">최종 관리자 대시보드</h2>
          <div className="mb-4">
            <button className={`btn ${selectedTab === 'all' ? 'btn-primary' : 'btn-secondary'} mr-2`} onClick={() => handleTabClick('all')}>전체</button>
            <button className={`btn ${selectedTab === 'subscribed' ? 'btn-primary' : 'btn-secondary'} mr-2`} onClick={() => handleTabClick('subscribed')}>구독 중</button>
            <button className={`btn ${selectedTab === 'notSubscribed' ? 'btn-primary' : 'btn-secondary'} mr-2`} onClick={() => handleTabClick('notSubscribed')}>구독 안 함</button>
            <button className="btn btn-info mr-2" onClick={() => handleSort('usersnum')}>유저 수 정렬 {sortOrder === 'asc' ? '▲' : '▼'}</button>
            <button className="btn btn-info mr-2" onClick={() => handleSort('end_date')}>만료일 정렬 {sortOrder === 'asc' ? '▲' : '▼'}</button>
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
  <div className="col-md-3">
    <div className="mb-4">
      <h4 className="text-center">AI 구독 비율 차트</h4>
      <AiChart a1={AiChartData.a1} a2={AiChartData.a2} a3={AiChartData.a3} />
    </div>
  </div>
  {/* <div className="col-md-3">
    <div className="mb-4">
      <h4 className="text-center">인프라 선택 비율 차트</h4>
      <InfraChart Case1={InfraChartData.Case1} Case2={InfraChartData.Case2} Case3={InfraChartData.Case3} />
    </div>
  </div> */}
</div>
</>
      ) : (
        <p className="mt-4">You don't have permission to access this page.</p>
      )}
    </div>
  );
};


export default AdminPage2;