import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { act, render, screen } from "@testing-library/react";
import HeatmapChartBase from "../HeatmapChartBase";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid='heatmap-chart' />;
    },
  };
});

describe("HeatmapChartBase Component", () => {
  it("should render a heatmap chart with the specified series and labels", async () => {
    const series = [
      {
        name: "Sunday",
        data: [
          {
            x: "12 AM",
            y: Math.floor(Math.random() * (8 - 0 + 1)) + 0,
          },
          {
            x: "1 AM",
            y: Math.floor(Math.random() * (8 - 0 + 1)) + 0,
          },
        ],
      },
    ];

    render(
      <ThemeProvider theme={legionTheme}>
        <HeatmapChartBase series={series} />
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

    const chart = screen.getByTestId("heatmap-chart");

    expect(chart).toBeInTheDocument();
  });

  it("should render a heatmap chart with custom chartProps", async () => {
    const series = [
      {
        name: "Sunday",
        data: [
          {
            x: "12 AM",
            y: Math.floor(Math.random() * (8 - 0 + 1)) + 0,
          },
          {
            x: "1 AM",
            y: Math.floor(Math.random() * (8 - 0 + 1)) + 0,
          },
        ],
      },
    ];

    const customChartProps = {
      height: 450,
      colors: ["#FF5733", "#3352FF"],
      legend: { show: true },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <HeatmapChartBase series={series} chartProps={customChartProps} />
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

    const chart = screen.getByTestId("heatmap-chart");

    expect(chart).toBeInTheDocument();
  });

  it("should render a heatmap chart with custom yaxis for multiple axes", async () => {
    const series = [
      {
        name: "Sunday",
        data: [
          {
            x: "12 AM",
            y: Math.floor(Math.random() * (8 - 0 + 1)) + 0,
          },
          {
            x: "1 AM",
            y: Math.floor(Math.random() * (8 - 0 + 1)) + 0,
          },
        ],
      },
    ];

    const customYAxis = [
      { labels: { style: { colors: "#FF5733" } } },
      { labels: { style: { colors: "#3352FF" } } },
    ];

    render(
      <ThemeProvider theme={legionTheme}>
        <HeatmapChartBase series={series} chartProps={{ yaxis: customYAxis }} />
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

    const chart = screen.getByTestId("heatmap-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom yaxis if needed
  });
});
