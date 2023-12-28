import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import AdminPage2 from './AdminPage2';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const AdminPage = ({ isAdmin }) => {
  const [data, setData] = useState(null);
  const [companyUserCounts, setCompanyUserCounts] = useState({});
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin');
        setData(response.data);

        if (response.data.user_counts && typeof response.data.user_counts === 'object') {
          const userCounts = {};
          Object.keys(response.data.user_counts).forEach((companyId) => {
            userCounts[companyId] = response.data.user_counts[companyId];
          });
          setCompanyUserCounts(userCounts);

          if (chart) {
            chart.data.labels = Object.keys(userCounts);
            chart.data.datasets[0].data = Object.values(userCounts);
            chart.update();
          }
        } else {
          console.error('Invalid user_counts data:', response.data.user_counts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!data) {
      fetchData();
    }
  }, [data, chart]);

  const userRole = localStorage.getItem('role');

  const destroyChart = () => {
    if (chart) {
      chart.destroy();
    }
  };

  const createChart = () => {
    const newChart = new Chart(/* 차트 옵션 설정 */);
    setChart(newChart);
  };

  useEffect(() => {
    createChart();
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return (
    <div className="container mt-4">
      {isAdmin || userRole === '1' ? (
        <>
          <AdminPage2 isAdmin={isAdmin} companyUserCounts={companyUserCounts} />
          <h2 className="mb-4">최종 관리자 대시보드</h2>
          <div className="mt-4">
            <h4>기업별 유저 테이블 레코드 수</h4>
            <Bar
              data={{
                labels: Object.keys(companyUserCounts),
                datasets: [
                  {
                    label: '유저 수',
                    data: Object.values(companyUserCounts),
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  x: [
                    {
                      type: 'category',
                      title: { display: true, text: '기업' },
                    },
                  ],
                  y: [
                    {
                      title: { display: true, text: '유저 수' },
                      beginAtZero: true,
                    },
                  ],
                },
              }}
            />
          </div>
          <Link to="/" className="btn btn-primary mr-2" onClick={destroyChart}>
            홈으로 이동
          </Link>
        </>
      ) : (
        <p className="mt-4">You don't have permission to access this page.</p>
      )}
    </div>
  );
};

export default AdminPage;
