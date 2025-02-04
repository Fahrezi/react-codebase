import { Fragment, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { ChartPropsDefault, ChartPropsTypes } from "./Types";
import { Spinner } from "@legion-ui/core";

export interface SemiCircleRadialBarChartBaseProps {
  series: number[];
  chartProps?: ChartPropsTypes;
  isLoading?: boolean;
}

const SemiCircleRadialBarChartBase: React.FC<
  SemiCircleRadialBarChartBaseProps
> = ({
  series,
  chartProps = {},
  isLoading = false, // Replace dataLoaded with isLoading if integrated with API
}) => {
  const {
    colors = ChartPropsDefault.color,
    dataLabels = ChartPropsDefault.dataLabels,
    tooltip = ChartPropsDefault.tooltip,
    height = 350,
    plotOptions,
  } = chartProps;
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    colors: colors,
    dataLabels: { ...ChartPropsDefault.dataLabels, ...dataLabels },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#D0D5DD",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: false,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
          },
          total: {
            color: "#000",
          },
        },
        ...plotOptions,
      },
    },
    grid: {
      padding: {
        top: -10,
      },
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

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDataLoaded(true);
    }, 1000);
  }, []);

  return (
    <Fragment>
      {dataLoaded ? (
        <ApexChart
          data-testid='semi-circle-radial-bar-chart'
          options={options}
          series={series}
          type='radialBar'
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
    </Fragment>
  );
};

export default SemiCircleRadialBarChartBase;
