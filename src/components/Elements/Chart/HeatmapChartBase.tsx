import ApexChart from "react-apexcharts";
import { ChartPropsDefault, ChartPropsTypes } from "./Types";
import { useEffect, useState } from "react";
import { Spinner } from "@legion-ui/core";

export interface HeatmapChartBaseProps {
  series: { name: string; data: { x: string; y: number }[] }[];
  chartProps?: ChartPropsTypes;
  isLoading?: boolean;
}

const HeatmapChartBase: React.FC<HeatmapChartBaseProps> = ({
  series,
  chartProps = {},
  isLoading = false, // Replace dataLoaded with isLoading if integrated with API
}) => {
  const {
    height = 360,
    colors = ChartPropsDefault.color,
    dataLabels = ChartPropsDefault.dataLabels,
    legend = ChartPropsDefault.legend,
    markers = ChartPropsDefault.markers,
    title = ChartPropsDefault.title,
    tooltip = ChartPropsDefault.tooltip,
    stroke = ChartPropsDefault.stroke,
    xaxis = ChartPropsDefault.xaxis,
    yaxis = ChartPropsDefault.yaxis,
    plotOptions,
  } = chartProps;

  const options: ApexCharts.ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "heatmap",
    },
    colors: colors,
    dataLabels: {
      ...ChartPropsDefault.dataLabels,
      ...dataLabels,
      enabled: false,
    },
    legend: {
      ...ChartPropsDefault.legend,
      ...legend,
      position: "bottom",
      horizontalAlign: "center",
      markers: {
        strokeWidth: 0.5,
        strokeColor: "#F5F3FF",
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
    plotOptions: plotOptions
      ? { heatmap: { ...plotOptions } }
      : { heatmap: { distributed: true } },
    fill: { opacity: 1 },
    xaxis: {
      ...ChartPropsDefault.xaxis,
      ...xaxis,
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
          data-testid='heatmap-chart'
          series={series}
          options={options}
          type='heatmap'
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

export default HeatmapChartBase;
