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
      colors={["#f76b8a", "#13D8F6"]}
      interactive={false}
      width={500}
      legend={true}
      strokeColor={"none"}
    />
  );
};

export default Piechart;
