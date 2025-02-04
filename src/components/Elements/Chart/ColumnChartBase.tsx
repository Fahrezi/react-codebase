import ApexChart from "react-apexcharts";
import { ChartPropsDefault, ChartPropsTypes } from "./Types";
import { useEffect, useState } from "react";
import { Spinner } from "@legion-ui/core";

export interface ColumnChartBaseProps {
  series: { name: string; data: number[] }[];
  labels: string[];
  chartProps?: ChartPropsTypes;
  isLoading?: boolean;
}

const ColumnChartBase: React.FC<ColumnChartBaseProps> = ({
  series,
  labels,
  chartProps = {},
  isLoading = false, // Replace dataLoaded with isLoading if integrated with API
}) => {
  const {
    height = 370,
    colors = ChartPropsDefault.color,
    dataLabels = ChartPropsDefault.dataLabels,
    legend = ChartPropsDefault.legend,
    markers = ChartPropsDefault.markers,
    plotOptions,
    title = ChartPropsDefault.title,
    tooltip = ChartPropsDefault.tooltip,
    stroke = ChartPropsDefault.stroke,
    xaxis = ChartPropsDefault.xaxis,
    yaxis = ChartPropsDefault.yaxis,
  } = chartProps;

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      stacked: false,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: colors,
    dataLabels: { ...ChartPropsDefault.dataLabels, ...dataLabels },
    legend: {
      ...ChartPropsDefault.legend,
      ...legend,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
        ...plotOptions,
      },
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
    fill: { opacity: 1 },
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
          data-testid='column-chart'
          series={series}
          options={options}
          type='bar'
          height={height}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "370px",
          }}
        >
          <Spinner data-testid='spinner' />
        </div>
      )}
    </>
  );
};

export default ColumnChartBase;
