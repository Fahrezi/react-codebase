import ApexChart from "react-apexcharts";
import { ChartPropsDefault, ChartPropsTypes } from "./Types";

export interface SparklineAreaChartBaseProps {
  series: { name: string; data: number[] }[];
  labels: string[];
  chartProps?: ChartPropsTypes;
}

const SparklineAreaChartBase: React.FC<SparklineAreaChartBaseProps> = ({
  series,
  labels,
  chartProps = {},
}) => {
  const {
    height = 370,
    colors = ChartPropsDefault.color,
    legend = ChartPropsDefault.legend,
    markers = ChartPropsDefault.markers,
    plotOptions,
    title = ChartPropsDefault.title,
    tooltip = ChartPropsDefault.tooltip,
    stroke = ChartPropsDefault.stroke,
    xaxis = ChartPropsDefault.xaxis,
  } = chartProps;

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 150,
      stacked: false,
      zoom: {
        enabled: false,
      },
      group: "sparklines",
      sparkline: {
        enabled: true,
      },
    },
    colors: colors,
    legend: {
      ...ChartPropsDefault.legend,
      ...legend,
    },
    plotOptions: {
      area: {
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
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.75,
        stops: [20, 100, 100, 100],
      },
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
    <ApexChart
      data-testid='sparkline-area-chart'
      series={series}
      options={options}
      type='area'
      height={height}
    />
  );
};

export default SparklineAreaChartBase;
