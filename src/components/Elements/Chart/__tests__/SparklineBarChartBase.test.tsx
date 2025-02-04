import { render, screen } from "@testing-library/react";
import SparklineBarChartBase from "../SparklineBarChartBase";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid='sparkline-bar-chart' />;
    },
  };
});

describe("SparklineBarChartBase Component", () => {
  it("should render a sparkline bar chart with the specified series and labels", () => {
    const series = [{ name: "series-1", data: [10, 20, 30, 40] }];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];

    render(<SparklineBarChartBase series={series} labels={labels} />);

    const chart = screen.getByTestId("sparkline-bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add more specific assertions related to the chart rendering if needed
  });

  it("should render a sparkline bar chart with custom chartProps", () => {
    const series = [{ name: "series-1", data: [10, 20, 30, 40] }];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];

    const customChartProps = {
      colors: ["#FF5733"],
      dataLabels: { enabled: false },
      tooltip: { enabled: false },
    };

    render(
      <SparklineBarChartBase
        series={series}
        labels={labels}
        chartProps={customChartProps}
      />
    );

    const chart = screen.getByTestId("sparkline-bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom chartProps if needed
  });

  it("should render a sparkline bar chart with custom plotOptions", () => {
    const series = [{ name: "series-1", data: [10, 20, 30, 40] }];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];

    const customPlotOptions = {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "bottom",
        },
      },
    };

    render(
      <SparklineBarChartBase
        series={series}
        labels={labels}
        chartProps={{ plotOptions: customPlotOptions }}
      />
    );

    const chart = screen.getByTestId("sparkline-bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom plotOptions if needed
  });
});
