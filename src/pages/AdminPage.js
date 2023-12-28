// AdminPage 컴포넌트
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import AdminPage2 from './AdminPage2';  // AdminPage2 컴포넌트를 import
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';


const AdminPage = ({ isAdmin }) => {
  const [data, setData] = useState(null);
  const [companyUserCounts, setCompanyUserCounts] = useState({});
  const [chart, setChart] = useState(null); // 차트에 대한 참조를 저장하는 상태 추가

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

    // 한 번만 실행되도록 변경
    if (!data) {
      fetchData();
    }
  }, [data]); // data를 의존성 배열에 추가

  const userRole = localStorage.getItem('role');

  const destroyChart = () => {
    // 차트를 파괴하기 전에 확인
    if (chart) {
      chart.destroy();
    }
  };

  const createChart = () => {
    // 차트 인스턴스 생성 및 참조 저장
    const newChart = new Chart(/* 차트 옵션 설정 */);
    setChart(newChart);
  };

  useEffect(() => {
    // 컴포넌트 마운트 시에 차트 생성
    createChart();

    // 컴포넌트 언마운트 시에 차트 파괴
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []); // 빈 의존성 배열을 전달하여 한 번만 실행

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

          {/* 차트 추가 */}
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
                  x: {
                    type: 'category', // "category" 스케일을 수동으로 등록
                    title: { display: true, text: '기업' },
                  },
                  y: { title: { display: true, text: '유저 수' }, beginAtZero: true },
                },
              }}
            />
          </div>

          {/* AdminPage2 컴포넌트를 렌더링하고 companyUserCounts prop을 전달 */}
          <AdminPage2 isAdmin={isAdmin} companyUserCounts={companyUserCounts} />

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