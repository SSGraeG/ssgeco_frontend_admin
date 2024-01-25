// RowAdminPage.js 파일 내용
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/RowAdminPage.css';
import { URL } from '../BaseURL';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const companyId = localStorage.getItem('company_id');
        const response = await axios.get(`${URL}/rowadmin`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Company-ID': companyId,
          },
        });

        setUserData(response.data.users);
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
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchData();
  }, [company_id, currentPage]);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>관리자 페이지<br /></h1>
      </div>

      <div className="admin-section" style={{ background: 'linear-gradient(to bottom right, #53e3a6, white)' }}>
        <h2>유저 정보 {company_id}</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>이메일</th>
              <th>이름</th>
              <th>휴대전화</th>
              <th>유저 삭제</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이징 컴포넌트 추가 */}
        <div className="pagination">
        </div>
      </div>
      <div className="coupon-container">
    <div className="admin-section" style={{ background: 'linear-gradient(to bottom right, #53e3a6, white)' }}>
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

  <div className="coupon-container" style={{ background: 'linear-gradient(to bottom right, #53e3a6, white)' }}>
  {/* 왼쪽 표 - Donation 카테고리 쿠폰 목록 */}
  <div className="coupon-list">
    <h2>Donation 카테고리별 쿠폰 목록</h2>
    <table className="coupon-table">
      <thead>
        <tr>
          <th>Donation Name</th>
          <th>Use Point</th>
          <th>Category</th>
          <th>Action</th>
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

  {/* 오른쪽 표 - Coupon 카테고리 쿠폰 목록 */}
  <div className="coupon-list">
    <h2>Coupon 카테고리별 쿠폰 목록</h2>
    <table className="coupon-table">
      <thead>
        <tr>
          <th>Coupon Name</th>
          <th>Use Point</th>
          <th>Category</th>
          <th>Action</th>
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
<div className="admin-section" style={{ background: 'linear-gradient(to bottom right, #53e3a6, white)' }}>
  <h2>Mileage Tracking</h2>
  <table className="mileage-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Use Date</th>
        <th>User Email</th>
        <th>Before Mileage</th>
        <th>Mileage Category ID</th>
        <th>After Mileage</th>
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
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            이전 페이지
          </button>
          <span>{currentPage}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>
            다음 페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default RowAdminPage;
