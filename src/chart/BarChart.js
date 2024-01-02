// // BarChart.js
// import React from 'react';
// import { Bar } from 'react-chartjs-2';

// const BarChart = ({ companyUserCounts }) => {
//   return (
//     <div>
//       <h4>기업별 유저 테이블 레코드 수</h4>
//       <Bar
//         data={{
//           labels: Object.keys(companyUserCounts),
//           datasets: [
//             {
//               label: '유저 수',
//               data: Object.values(companyUserCounts),
//               backgroundColor: 'rgba(75,192,192,0.4)',
//               borderColor: 'rgba(75,192,192,1)',
//               borderWidth: 1,
//             },
//           ],
//         }}
//         options={{
//           scales: {
//             x: [
//               {
//                 type: 'category',
//                 title: { display: true, text: '기업' },
//               },
//             ],
//             y: [
//               {
//                 title: { display: true, text: '유저 수' },
//                 beginAtZero: true,
//               },
//             ],
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default BarChart;
