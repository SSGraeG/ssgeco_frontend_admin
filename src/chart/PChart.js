import React from "react";
import DonutChart from "react-donut-chart";

const Piechart = ({ Delivery, ECumus, Other }) => {
  return (
    <DonutChart
      data={[
        {
          label: "Other",
          value: Other,
        },
        {
          label: "ECumus",
          value: ECumus,
        },
        {
          label: "Delivery",
          value: Delivery,
        },
      ]}
      
      style={{ fontSize: "9px" }} // 원하는 크기로 조절
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
