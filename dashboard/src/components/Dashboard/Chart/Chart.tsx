import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

type ChartType = "SPACE" | "FREQUENCY";

export interface ChartDataInput {
  datetime: string;
  value: number;
}

interface ChartData {
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries;
}
export default function Chart({
  type,
  input,
}: {
  type: ChartType;
  input: ChartDataInput[];
}) {
  const [chartData, setChartData] = useState<ChartData>();
  const titleText = type === "SPACE" ? "Used Trash Space" : "Talking Frequency";
  const subTitleText = type === "SPACE" ? "0.5 Litre of Trash" : "40 Time/Hr";
  const lineColor = type === "SPACE" ? "#30FF98" : "#FFB330";
  const seriesName = type === "SPACE" ? "Used Space" : "Talking Rate";
  const unit = type === "SPACE" ? "L" : "Time/Hr";

  const formatDate = (value: number) => {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const today = new Date().toLocaleString();

  useEffect(() => {
    //fetch
    const data = input;

    setChartData({
      options: {
        chart: {
          id: "basic-bar",
          height: 300,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        stroke: {
          curve: "smooth",
          colors: [lineColor],
          width: 2,
        },
        markers: {
          colors: [lineColor, "#E91E63", "#9C27B0"],
        },
        tooltip: {
          marker: {
            show: false,
          },
          x: {
            formatter: function (value) {
              return formatDate(value);
            },
          },
          y: {
            formatter: function (value) {
              return value + " " + unit;
            },
          },
          style: {
            fontSize: "8px",
          },
        },
        title: {
          text: titleText,
          align: "left",
          style: {
            color: "#FFFFFF",
            fontSize: "10px",
            fontWeight: "bold",
          },
        },
        subtitle: {
          text: subTitleText + " | " + today,
          align: "left",
          style: {
            color: "#FFFFFF",
            fontSize: "8px",
            fontWeight: "semibold",
          },
        },
        xaxis: {
          tooltip: { enabled: false },
          crosshairs: { show: true },
          categories: data.map((item) => item?.datetime),

          labels: {
            showDuplicates: false,
            style: {
              colors: "#637381",
              fontSize: "6px",
              fontWeight: "normal",
            },
            datetimeFormatter: {
              hour: "HH:mm",
            },
            formatter: function (value) {
              const date = new Date(value);
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            },
          },
        },
        yaxis: {
          max: 100,
          labels: {
            style: {
              colors: "#637381",
              fontSize: "6px",
              fontWeight: "normal",
            },
          },
        },
      },
      series: [
        {
          name: seriesName,
          data: data.map((item) => item?.value),
        },
      ],
    });
  }, []);

  return (
    <div>
      {chartData && chartData?.series && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          width="400"
          height="200"
        />
      )}
    </div>
  );
}
