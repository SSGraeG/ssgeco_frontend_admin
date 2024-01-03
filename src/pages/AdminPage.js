import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from '../chart/DonutChart';
import PChart from '../chart/PChart';
import { Link } from 'react-router-dom';

const AdminPage = ({ isAdmin }) => {
 
  const [data, setData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [DonutChartData, setDonutChartData] = useState({ win: 0, defeat: 0 });
  const [PChartData, setPChartData] = useState({ Delivery: 0, ECumus: 0, Other: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.36.124.56:5000/api/get_data');
        setData(response.data);

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
            <th onClick={() => handleSort('email')}>이메일</th>
            <th onClick={() => handleSort('phone')}>연락처</th>
            <th onClick={() => handleSort('end_date')}>만료일</th>
            <th onClick={() => handleSort('category')}>산업별 카테고리</th>
            <th onClick={() => handleSort('subscription_status')}>구독여부</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>{user.company_name}</td>
              <td>{user.usersnum}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.end_date}</td>
              <td>{user.category}</td>
              <td>{user.subscription_status === 'yes' ? '구독 중' : '구독 안 함'}</td>
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
          <h2 className="mb-4">Your Admin Application</h2>
          <div className="mb-4">
            <button className={`btn ${selectedTab === 'all' ? 'btn-primary' : 'btn-secondary'} mr-2`} onClick={() => handleTabClick('all')}>전체</button>
            <button className={`btn ${selectedTab === 'subscribed' ? 'btn-primary' : 'btn-secondary'} mr-2`} onClick={() => handleTabClick('subscribed')}>구독 중</button>
            <button className={`btn ${selectedTab === 'notSubscribed' ? 'btn-primary' : 'btn-secondary'} mr-2`} onClick={() => handleTabClick('notSubscribed')}>구독 안 함</button>
            <button className="btn btn-info mr-2" onClick={() => handleSort('usersnum')}>유저 수 정렬 {sortOrder === 'asc' ? '▲' : '▼'}</button>
            <button className="btn btn-info mr-2" onClick={() => handleSort('end_date')}>만료일 정렬 {sortOrder === 'asc' ? '▲' : '▼'}</button>
          </div>

          {renderTable()}
          <div className="mt-4 d-flex justify-content-between">
            <div>
              <h4>구독자 비율 차트</h4>
              <DonutChart win={DonutChartData.win} defeat={DonutChartData.defeat} />
            </div>
            <div>
              <h4>카테고리별 비율 차트</h4>
              <PChart Delivery={PChartData.Delivery} ECumus={PChartData.ECumus} Other={PChartData.Other} />
            </div>
          </div>
          <div>
            <Link to="/" className="btn btn-primary mr-2">홈으로 이동</Link>
          </div>
        </>
      ) : (
        <p className="mt-4">You don't have permission to access this page.</p>
      )}
    </div>
  );
};

export default AdminPage;
