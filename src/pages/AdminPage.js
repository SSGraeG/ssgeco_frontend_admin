  import React, { useState, useEffect, useCallback } from 'react';
  import axios from 'axios';
  import AdminPage2 from './AdminPage2';
  import { Bar } from 'react-chartjs-2';
  import { Chart } from 'chart.js/auto';
  import { URL } from '../BaseURL';
  import '../css/styles.css'; // 전역 스타일 파일 가져오기


  const AdminPage = ({ isAdmin }) => {
    const [data, setData] = useState(null);
    const [companyUserCounts, setCompanyUserCounts] = useState({});
    const [chart, setChart] = useState(null);

    const destroyChart = useCallback(() => {
      if (chart) {
        chart.destroy();
      }
    }, [chart]);

    const createChart = useCallback(() => {
      const chartElement = document.getElementById('myChart');

      if (chartElement) {
        const newChart = new Chart(chartElement, {
          type: 'bar',
          data: {
            labels: [],
            datasets: [
              {
                label: '유저 수',
                data: [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: [
                {
                  type: 'category',
                  title: {
                    display: true,
                    text: '기업',
                    font: {
                      size: 16, // 폰트 크기
                      weight: 'bold', // 폰트 두께
                    },
                    color: '#333', // 폰트 색상
                  },
                },
              ],
              y: [
                {
                  title: {
                    display: true,
                    text: '유저 수',
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                    color: '#333',
                  },
                  beginAtZero: true,
                },
              ],
            },
          },
        });

        setChart(newChart);
      } else {
        console.error("차트 요소를 찾을 수 없습니다");
      }
    }, [setChart]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/admin`);
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

    useEffect(() => {
      createChart();
      return () => {
        destroyChart();
      };
    }, [createChart, destroyChart]);

    return (
      <div className="admin-section" >

      {isAdmin || userRole === '1' ? (
          <>
            <AdminPage2 isAdmin={isAdmin} companyUserCounts={companyUserCounts} />
            <div className="mt-4" style={{ width: '100%', height: '400px' }}>

              <h4>기업별 유저 테이블 레코드 수</h4>
              <Bar
                data={{
                  labels: Object.keys(companyUserCounts).map(companyId => {
                    const companyData = data.companies.find(company => company.id === companyId);
                    return companyData ? companyData.name : companyId;
                  }),
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
                        plugins={{
                          legend: {
                            display: false,
                          },
                        }}
                      />

            </div>
          </>
        ) : (
          <p className="mt-4">You don't have permission to access this page.</p>
        )}
      </div>
    );
  };

  export default AdminPage;