import { Fragment } from "react";
import ApexChart from "react-apexcharts";
import { ChartPropsDefault, ChartPropsTypes } from "./Types";

interface SparklineBarChartBaseProps extends ChartPropsTypes {
  series: {
    name: string;
    data: number[];
  }[];
  labels: string[];
  chartProps?: ChartPropsTypes;
}

const SparklineBarChartBase: React.FC<SparklineBarChartBaseProps> = ({
  series,
  labels,
  chartProps = {},
}) => {
  const {
    colors = ChartPropsDefault.color,
    dataLabels = ChartPropsDefault.dataLabels,
    tooltip = ChartPropsDefault.tooltip,
    xaxis = ChartPropsDefault.xaxis,
    height = 30,
    plotOptions,
  } = chartProps;
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      width: 100,
      height: 35,
      sparkline: {
        enabled: true,
      },
    },
    colors: colors,
    dataLabels: { ...ChartPropsDefault.dataLabels, ...dataLabels },
    plotOptions: {
      bar: {
        borderRadius: 6,
        borderRadiusApplication: "end",
        horizontal: true,
        dataLabels: {
          position: "top",
        },
        ...plotOptions,
      },
    },
    labels: labels,
    xaxis: {
      ...ChartPropsDefault.xaxis,
      ...xaxis,
    },
    tooltip: {
      ...ChartPropsDefault.tooltip,
      ...tooltip,
    },
    noData: {
      text: "There's no data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
    },
  };
  return (
    <Fragment>
      <ApexChart
        data-testid='sparkline-bar-chart'
        options={options}
        series={series}
        type='bar'
        height={height}
        width={150}
      />
    </Fragment>
  );
};

export default SparklineBarChartBase;
