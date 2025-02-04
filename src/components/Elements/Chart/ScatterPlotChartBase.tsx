import ApexChart from "react-apexcharts";
import { ChartPropsDefault, ChartPropsTypes } from "./Types";
import { useEffect, useState } from "react";
import { Spinner } from "@legion-ui/core";

export interface ScatterPlotChartBaseProps {
  series: { name: string; data: { x: string; y: number }[] }[];
  chartProps?: ChartPropsTypes;
  isLoading?: boolean;
}

const ScatterPlotChartBase: React.FC<ScatterPlotChartBaseProps> = ({
  series,
  chartProps = {},
  isLoading = false, // Replace dataLoaded with isLoading if integrated with API
}) => {
  const {
    height = 370,
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
      type: "scatter",
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
          data-testid='scatter-plot-chart'
          series={series}
          options={options}
          type='scatter'
          height={height}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "350px",
          }}
        >
          <Spinner data-testid='spinner' />
        </div>
      )}
    </>
  );
};

export default ScatterPlotChartBase;
