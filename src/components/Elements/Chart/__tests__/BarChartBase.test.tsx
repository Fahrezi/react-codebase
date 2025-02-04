import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { act, render, screen } from "@testing-library/react";
import BarChartBase from "../BarChartBase";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid='bar-chart' />;
    },
  };
});

describe("BarChartBase Component", () => {
  it("should render a bar chart with the specified series and labels", async () => {
    const series = [
      { name: "Series 1", data: [10, 20, 30] },
      { name: "Series 2", data: [5, 15, 25] },
    ];
    const labels = ["Label 1", "Label 2", "Label 3"];

    render(
      <ThemeProvider theme={legionTheme}>
        <BarChartBase series={series} labels={labels} />
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

    const chart = screen.getByTestId("bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add more specific assertions related to the chart rendering if needed
  });

  it("should render a bar chart with custom chartProps", async () => {
    const series = [
      { name: "Series 1", data: [10, 20, 30] },
      { name: "Series 2", data: [5, 15, 25] },
    ];
    const labels = ["Label 1", "Label 2", "Label 3"];

    const customChartProps = {
      colors: ["#FF5733", "#3352FF"],
      dataLabels: { enabled: false },
      tooltip: { enabled: true },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <BarChartBase
          series={series}
          labels={labels}
          chartProps={customChartProps}
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

    const chart = screen.getByTestId("bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom chartProps if needed
  });

  it("should render a bar chart with custom plotOptions", async () => {
    const series = [
      { name: "Series 1", data: [10, 20, 30] },
      { name: "Series 2", data: [5, 15, 25] },
    ];
    const labels = ["Label 1", "Label 2", "Label 3"];

    const customPlotOptions = {
      bar: {
        horizontal: false,
      },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <BarChartBase
          series={series}
          labels={labels}
          chartProps={{ plotOptions: customPlotOptions }}
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

    const chart = screen.getByTestId("bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom plotOptions if needed
  });

  it("should render a bar chart with custom yaxis for multiple axes", async () => {
    const series = [{ name: "Series 1", data: [10, 20, 30, 40] }];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];

    const customYAxis = [
      { labels: { style: { colors: "#FF5733" } } },
      { labels: { style: { colors: "#3352FF" } } },
    ];

    render(
      <ThemeProvider theme={legionTheme}>
        <BarChartBase
          series={series}
          labels={labels}
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

    const chart = screen.getByTestId("bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom yaxis if needed
  });
});
