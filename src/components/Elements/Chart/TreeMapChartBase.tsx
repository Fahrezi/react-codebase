import ApexChart from "react-apexcharts";
import { ChartPropsDefault, ChartPropsTypes } from "./Types";
import { useEffect, useState } from "react";
import { Spinner } from "@legion-ui/core";

export interface TreeMapChartBaseProps {
  series: { name: string; data: { x: string; y: number }[] }[];
  chartProps?: ChartPropsTypes;
  isLoading?: boolean;
}

const TreeMapChartBase: React.FC<TreeMapChartBaseProps> = ({
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
    plotOptions,
    title = ChartPropsDefault.title,
    tooltip = ChartPropsDefault.tooltip,
    stroke = ChartPropsDefault.stroke,
  } = chartProps;

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "treemap",
      zoom: { enabled: false },
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
    fill: { opacity: 1 },
    plotOptions: {
      treemap: {
        ...plotOptions,
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
          data-testid='tree-map-chart'
          series={series}
          options={options}
          type='treemap'
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

export default TreeMapChartBase;
