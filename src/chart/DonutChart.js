import React from "react";
import DonutChart from "react-donut-chart";

const Piechart = ({ win, defeat }) => {
  return (
    <DonutChart
      data={[
        {
          label: "비구독",
          value: defeat,
        },
        {
          label: "구독",
          value: win,
        },
      ]}
      style={{ fontSize: "12px" }} // 원하는 크기로 조절
      colors={["#f76b8a", "#13D8F6", "#9c7dcb"]}
      interactive={false}
      width={300}
      height={300} // 원하는 크기로 조절
      legend={true}
      strokeColor={"none"}
    />
  );
};

export default Piechart;
