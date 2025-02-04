import ApexChart from "react-apexcharts";
import { ChartPropsDefault, ChartPropsTypes } from "./Types";
import { useEffect, useState } from "react";
import { Spinner } from "@legion-ui/core";

export interface LineChartBaseProps {
  series: { name: string; data: number[] }[];
  labels: string[];
  chartProps?: ChartPropsTypes;
  isLoading?: boolean;
}

const LineChartBase: React.FC<LineChartBaseProps> = ({
  series,
  labels,
  chartProps = {},
  isLoading = false, // Replace dataLoaded with isLoading if integrated with API
}) => {
  const {
    height = 350,
    colors = ChartPropsDefault.color,
    dataLabels = ChartPropsDefault.dataLabels,
    legend = ChartPropsDefault.legend,
    markers = ChartPropsDefault.markers,
    title = ChartPropsDefault.title,
    tooltip = ChartPropsDefault.tooltip,
    stroke = ChartPropsDefault.stroke,
    xaxis = ChartPropsDefault.xaxis,
    yaxis = ChartPropsDefault.yaxis,
  } = chartProps;

  const options: ApexCharts.ApexOptions = {
    chart: {
      zoom: {
        enabled: false,
      },
      toolbar: { show: false },
    },
    colors: colors,
    dataLabels: { ...ChartPropsDefault.dataLabels, ...dataLabels },
    legend: {
      ...ChartPropsDefault.legend,
      ...legend,
    },
    markers: {
      ...ChartPropsDefault.markers,
      ...markers,
    },
    stroke: {
      ...ChartPropsDefault.stroke,
      ...stroke,
    },
    title: {
      ...ChartPropsDefault.title,
      ...title,
    },
    tooltip: {
      ...ChartPropsDefault.tooltip,
      ...tooltip,
    },
    xaxis: {
      ...ChartPropsDefault.xaxis,
      ...xaxis,
      categories: labels,
    },
    yaxis: [
      {
        ...ChartPropsDefault.yaxis,
        ...(yaxis && yaxis[0] ? yaxis[0] : {}),
      },
      ...(yaxis && yaxis[1]
        ? [
            {
              ...ChartPropsDefault.yaxis,
              ...yaxis[1],
            },
          ]
        : []),
    ],
    noData: {
      text: "There's no data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
    },
  };

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDataLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      {dataLoaded ? (
        <ApexChart
          data-testid='line-chart'
          series={series}
          options={options}
          type='line'
          height={height}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "360px",
          }}
        >
          <Spinner data-testid='spinner' />
        </div>
      )}
    </>
  );
};

export default LineChartBase;
