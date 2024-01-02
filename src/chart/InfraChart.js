import React from "react";
import DonutChart from "react-donut-chart";

const InfraChart = ({ Case1, Case2, Case3 }) => {
  console.log("InfraChart Data:", Case1, Case2, Case3);

  return (
    <DonutChart
      data={[
        {
          label: "Case1",
          value: Case1,
        },
        {
          label: "Case2",
          value: Case2,
        },
        {
          label: "Case3",
          value: Case3,
        },
      ]}
      style={{ fontSize: "9px" }}
      colors={["#f76b8a", "#13D8F6", "#9c7dcb"]}
      interactive={false}
      width={300}
      height={300}
      legend={true}
      strokeColor={"none"}
    />
  );
};

export default InfraChart;