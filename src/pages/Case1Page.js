import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
// import '../css/RowAdminPage.css';
import { URL } from '../BaseURL';
import '../css/styles.css';
import { useParams } from 'react-router-dom'; // 추가
import Lottie from 'lottie-react';
import animationData from './json/Business Analysis.json';

const RowAdminPage = () => {
  const [userData, setUserData] = useState([]);
  const [couponName, setCouponName] = useState('');
  const [usepoint, setUsepoint] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [couponList, setCouponList] = useState([]);
  const [mileageTracking, setMileageTracking] = useState([]);
  const [categoryList] = useState([
    { id: 1, name: 'donation', category: 'donation'},
    { id: 2, name: 'coupon', category: 'coupon' },
  ]);
  const { company_id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'User Counts',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const companyId = localStorage.getItem('company_id');

        const response = await axios.get(`${URL}/company/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': companyId,
          },
          params: {
            page: currentPage, // 페이징에 현재 페이지 추가
          },
        });

        const modifiedUserData = response.data.users.map(user => ({
          ...user,
          address: user.address ? user.address.substring(0, 2) : '',
        }));

        setUserData(modifiedUserData);

        const userCounts = {};
        modifiedUserData.forEach(user => {
          if (user.address && user.address.length >= 2) {
            const addressPrefix = user.address.substring(0, 2);
            userCounts[addressPrefix] = (userCounts[addressPrefix] || 0) + 1;
          }
        });

        const couponResponse = await axios.get(`${URL}/company/user/coupon`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': companyId,
          },
        });
        setCouponList(couponResponse.data.coupons);

        const responseMileage = await axios.get(`${URL}/company/user/mileage`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': companyId,
          },
          params: {
            page: currentPage,
          },
        });
        setMileageTracking(responseMileage.data.mileage_tracking);
        // Bar 차트 데이터 업데이트
        setChartData({
          labels: Object.keys(userCounts),
          datasets: [
            {
              label: 'User Counts',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: Object.values(userCounts),
            },
          ],
        });

        // ... 이하 코드는 이전과 동일하게 유지합니다.
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [company_id,currentPage]);

  // 차트 옵션 설정 (옵션을 필요에 따라 수정 가능)
  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        barPercentage: 0.5,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleCreateCoupon = async () => {
    try {
      const token = localStorage.getItem('token');
      const companyId = localStorage.getItem('company_id');

      const response = await axios.post(
        `${URL}/company/user/coupon`,
        {
          name: couponName,
          usepoint: usepoint,
          category: selectedCategory,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': companyId,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Created Coupon:', response.data.coupon);

      const updatedCouponList = [...couponList, response.data.coupon];
      setCouponList(updatedCouponList);
    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const companyId = localStorage.getItem('company_id');

      const response = await axios.delete(
        `${URL}/company/user/${email}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': companyId,
          },
        }
      );

      console.log('Deleted User:', response.data);

      const updatedUserData = userData.filter((user) => user.email !== email);
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  const handleDeleteCoupon = async (couponId) => {
    try {
      const token = localStorage.getItem('token');
      const companyId = localStorage.getItem('company_id');

      const response = await axios.delete(
        `${URL}/company/user/coupon/${couponId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': companyId,
          },
        }
      );

      console.log('Deleted Coupon:', response.data);

      const updatedCouponList = couponList.filter((coupon) => coupon.id !== couponId);
      setCouponList(updatedCouponList);
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div className="admin-container">
        <div style={{ marginBottom: '10px', width: '10%', height: '10%', overflow: 'hidden' }}>
          <Lottie animationData={animationData} loop={false} />
        </div>
      <div className="chart-container">
        <h1>유저 목록</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>이메일</th>
              <th>이름</th>
              <th>유저 주소</th>
            </tr>
          </thead>
          <tbody>
          {userData.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="coupon-container">
        <div className="admin-section">
          <h2>쿠폰 생성</h2>
          <input
            type="text"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value)}
          />
          <label>포인트 가격:</label>
          <input
            type="number"
            value={usepoint}
            onChange={(e) => setUsepoint(e.target.value)}
          />
          <label>카테고리:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">기부 & 할인 쿠폰 항목 선택</option>
              {categoryList.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.name}
                </option>
              ))}
            </select>
          <button onClick={handleCreateCoupon}>Create Coupon</button>
        </div>
        <div className="coupon-container">
          <div className="coupon-list">
            <h2>기부 카테고리별 쿠폰 목록</h2>
            <table className="coupon-table">
              <thead>
                <tr>
                  <th>기부 이름</th>
                  <th>사용 포인트</th>
                  <th>카테고리</th>
                  <th>동작</th>
                </tr>
              </thead>
              <tbody>
                {couponList
                  .filter((coupon) => coupon.category === 'donation')
                  .map((coupon) => (
                    <tr key={coupon.id}>
                      <td>{coupon.name}</td>
                      <td>{coupon.usepoint}</td>
                      <td>{coupon.category}</td>
                      <td>
                        <button onClick={() => handleDeleteCoupon(coupon.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="coupon-list">
            <h2>할인 쿠폰 카테고리별 쿠폰 목록</h2>
            <table className="coupon-table">
              <thead>
                <tr>
                  <th>할인 쿠폰 이름</th>
                  <th>사용 포인트</th>
                  <th>카테고리</th>
                  <th>동작</th>
                </tr>
              </thead>
              <tbody>
                {couponList
                  .filter((coupon) => coupon.category === 'coupon')
                  .map((coupon) => (
                    <tr key={coupon.id}>
                      <td>{coupon.name}</td>
                      <td>{coupon.usepoint}</td>
                      <td>{coupon.category}</td>
                      <td>
                        <button onClick={() => handleDeleteCoupon(coupon.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="admin-section">
        <h2>Mileage Tracking</h2>
        <table className="mileage-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>사용 날짜</th>
              <th>유저 이메일</th>
              <th>이전 마일리지</th>
              <th>마일리지 카테고리 ID</th>
              <th>이후 마일리지</th>
            </tr>
          </thead>
          <tbody>
            {mileageTracking.map((mileage) => (
              <tr key={mileage.id}>
                <td>{mileage.id}</td>
                <td>{mileage.use_date}</td>
                <td>{mileage.user_email}</td>
                <td>{mileage.before_mileage}</td>
                <td>{mileage.mileage_category_id}</td>
                <td>{mileage.after_mileage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 페이징 컴포넌트 추가 */}
        <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            이전 페이지
          </button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            다음 페이지
          </button>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default RowAdminPage;