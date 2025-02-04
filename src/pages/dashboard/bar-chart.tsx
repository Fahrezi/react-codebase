import { Box } from "@legion-ui/core";
import { Fragment } from "react";
import { useFetchDataBarChart } from "src/api/queries/dashboardInfrastructure";
import BarChartCard from "src/components/DashboardCharts/BarChart/BarChartCard";

export type SeriesType = {
  name: string;
  data: number[];
};

export type columnChartTypes = {
  title: string;
  tooltip: string;
  labels: string[];
  series: SeriesType[];
  isLoading: boolean;
  error?: any;
};

const BarChart = () => {
  const defaultColumnChart: columnChartTypes = {
    title: "",
    tooltip: "",
    labels: [],
    series: [],
    isLoading: true,
  };

  const { data = defaultColumnChart } = useFetchDataBarChart();

  const chartProps = {
    height: 358,
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      title: {
        text: "Product",
      },
    },
    yaxis: [
      {
        title: {
          text: "Total Ticket",
        },
        labels: {
          formatter: function (value: any) {
            return value.length > 14 ? value.substring(0, 14) + "..." : value;
          },
          hideOverlappingLabels: false,
        },
      },
    ],
  };

  return (
    <Fragment>
      <Box width={{ xl: "50%", md: "100%" }} padding='12px'>
        <BarChartCard
          title='Bar Chart Example'
          tooltip='Bar Chart Example'
          labels={data.labels}  
          chartProps={chartProps}
          series={data.series}
          isLoading={data.isLoading}
          />
      </Box>
    </Fragment>
  );
};

export default BarChart;
