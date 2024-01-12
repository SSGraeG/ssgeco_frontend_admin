// AiChart.js

import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const AiChart = (props) => {
  const { a1, a2, a3 } = props;

  useEffect(() => {
    console.log('AiChart useEffect');
    console.log('AiChart Data:', a1, a2, a3);

    const canvasId = 'aiChart'; // 고유한 ID로 변경

    // 차트를 그릴 canvas 요소를 가져오기
    const ctx = document.getElementById(canvasId);

    // 이전에 그려진 차트가 있다면 제거
    if (ctx) {
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
    }

    // 새로운 차트 생성
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['일회 용기 세척 여부 AI', '택배 테이프 제거 여부 AI', '사람 인식 여부 AI'],
        datasets: [{
          label: 'AI Subscription',
          data: [a1, a2, a3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // 컴포넌트가 언마운트될 때 차트를 파괴
    return () => {
      newChart.destroy();
    };

  }, [a1, a2, a3]);

  return (
    <div>
      {/* 차트가 그려질 영역 */}
      <canvas id="aiChart" width="300" height="300"></canvas>
    </div>
  );
};

export default AiChart;