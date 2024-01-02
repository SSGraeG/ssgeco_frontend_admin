import React from "react";
import DonutChart from "react-donut-chart";

const DChart = ({ win, defeat }) => {
  // Ensure win and defeat are valid numbers
  const winValue = isNaN(win) ? 0 : win;
  const defeatValue = isNaN(defeat) ? 0 : defeat;

  const data = [
    {
      label: "비구독",
      value: defeatValue,
    },
    {
      label: "구독",
      value: winValue,
    },
  ];

  return (
    <DonutChart
      data={data}
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

export default DChart;
