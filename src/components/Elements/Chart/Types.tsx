type CustomTooltipTypes = (
  series: any,
  seriesIndex: number,
  dataPointIndex: number,
  w: any
) => React.ReactNode;

export type ChartPropsTypes = {
  height?: number;
  axisTitle?: {
    xaxis: string;
    yaxis: string;
    yaxisOpposite?: string;
    yaxisOppositeLabels?: any;
  };
  customTooltip?: CustomTooltipTypes;
  plotOptions?: any;
  donutLabels?: string;
  colors?: any;
  dataLabels?: any;
  legend?: any;
  markers?: any;
  stroke?: any;
  title?: any;
  tooltip?: any;
  xaxis?: any;
  yaxis?: any;
};

export const ChartPropsDefault = {
  color: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
  dataLabels: {},
  legend: {},
  markers: {},
  stroke: {},
  title: {
    text: undefined,
    align: "center",
    margin: 0,
    offsetX: 20,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "12px",
      fontWeight: "800",
      fontFamily: undefined,
      color: "#000000",
    },
  },
  tooltip: {},
  xaxis: {
    tooltip: {
      enabled: false,
      formatter: undefined,
      offsetY: 0,
      style: {
        fontSize: 0,
        fontFamily: 0,
      },
    },
  },
  yaxis: {},
};
