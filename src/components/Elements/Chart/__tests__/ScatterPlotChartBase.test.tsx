import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { act, render, screen } from "@testing-library/react";
import ScatterPlotChartBase from "../ScatterPlotChartBase";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid='scatter-plot-chart' />;
    },
  };
});

describe("ScatterPlotChartBase Component", () => {
  it("should render a scatter plot chart with the specified series", async () => {
    const series = [
      {
        name: "Series 1",
        data: [
          { x: "title", y: 12 },
          { x: "title", y: 34 },
          { x: "title", y: 23 },
        ],
      },
    ];

    render(
      <ThemeProvider theme={legionTheme}>
        <ScatterPlotChartBase series={series} />
      </ThemeProvider>
    );

    // Assert that the spinner is initially displayed
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    // Simulate the delay for data loading (1 second)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // Assert that the spinner is no longer displayed
    expect(spinner).not.toBeInTheDocument();

    const chart = screen.getByTestId("scatter-plot-chart");

    expect(chart).toBeInTheDocument();

    // You can add more specific assertions related to the chart rendering if needed
  });

  it("should render a scatter plot chart with custom chartProps", async () => {
    const series = [
      {
        name: "Series 1",
        data: [
          { x: "title", y: 12 },
          { x: "title", y: 34 },
          { x: "title", y: 23 },
        ],
      },
    ];

    const customChartProps = {
      height: 450,
      colors: ["#FF5733"],
      legend: { show: true },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <ScatterPlotChartBase series={series} chartProps={customChartProps} />
      </ThemeProvider>
    );

    // Assert that the spinner is initially displayed
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    // Simulate the delay for data loading (1 second)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // Assert that the spinner is no longer displayed
    expect(spinner).not.toBeInTheDocument();

    const chart = screen.getByTestId("scatter-plot-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom chartProps if needed
  });

  it("should render a scatter plot chart with custom yaxis for multiple axes", async () => {
    const series = [
      {
        name: "Series 1",
        data: [
          { x: "title", y: 12 },
          { x: "title", y: 34 },
          { x: "title", y: 23 },
        ],
      },
    ];

    const customYAxis = [
      { labels: { style: { colors: "#FF5733" } } },
      { labels: { style: { colors: "#3352FF" } } },
    ];

    render(
      <ThemeProvider theme={legionTheme}>
        <ScatterPlotChartBase
          series={series}
          chartProps={{ yaxis: customYAxis }}
        />
      </ThemeProvider>
    );

    // Assert that the spinner is initially displayed
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    // Simulate the delay for data loading (1 second)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // Assert that the spinner is no longer displayed
    expect(spinner).not.toBeInTheDocument();

    const chart = screen.getByTestId("scatter-plot-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom yaxis if needed
  });
});
