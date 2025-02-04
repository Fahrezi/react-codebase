import React from "react";
import { render, screen } from "@testing-library/react";
import SparklineAreaChartBase from "../SparklineAreaChartBase";

jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div data-testid='sparkline-area-chart' />,
}));

describe("SparklineAreaChartBase Component", () => {
  it("should render a sparkline area chart with the specified series and labels", () => {
    const series = [
      { name: "Series 1", data: [10, 20, 30] },
      { name: "Series 2", data: [5, 15, 25] },
    ];
    const labels = ["Label 1", "Label 2", "Label 3"];

    render(<SparklineAreaChartBase series={series} labels={labels} />);

    const chart = screen.getByTestId("sparkline-area-chart");

    expect(chart).toBeInTheDocument();

    // You can add more specific assertions related to the chart rendering if needed
  });

  it("should render a sparkline area chart with custom chartProps", () => {
    const series = [
      { name: "Series 1", data: [10, 20, 30] },
      { name: "Series 2", data: [5, 15, 25] },
    ];
    const labels = ["Label 1", "Label 2", "Label 3"];

    const customChartProps = {
      colors: ["#FF5733", "#3352FF"],
      legend: { show: false },
      markers: { size: 4 },
      tooltip: { enabled: true },
      stroke: { curve: "smooth" },
    };

    render(
      <SparklineAreaChartBase
        series={series}
        labels={labels}
        chartProps={customChartProps}
      />
    );

    const chart = screen.getByTestId("sparkline-area-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom chartProps if needed
  });
});
