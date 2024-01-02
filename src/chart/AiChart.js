// AiChart.jsx
import React from "react";
import DonutChart from "react-donut-chart";

const AiChart = ({ a1, a2, a3 }) => {
  console.log("AiChart Data:", a1, a2, a3);
  return (
    <DonutChart
      data={[
        {
          label: "일회 용기 세척 여부 AI",
          value: a1,
        },
        {
          label: "택배 테이프 제거 여부 AI",
          value: a2,
        },
        {
          label: "사람 인식 여부 AI",
          value: a3,
        },
      ]}
      style={{ fontSize: "12px" }}
      colors={["#f76b8a", "#13D8F6", "#9c7dcb"]}
      interactive={false}
      width={300}
      height={300}
      legend={true}
      strokeColor={"none"}
    />
  );
};

export default AiChart;
