import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { act, render, screen } from "@testing-library/react";
import AreaChartBase from "../AreaChartBase";

jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div data-testid='area-chart' />,
}));

describe("AreaChartBase Component", () => {
  it("should render an area chart with the specified series and labels", async () => {
    const series = [
      { name: "Series 1", data: [10, 20, 30] },
      { name: "Series 2", data: [5, 15, 25] },
    ];
    const labels = ["Label 1", "Label 2", "Label 3"];

    render(
      <ThemeProvider theme={legionTheme}>
        <AreaChartBase series={series} labels={labels} />
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

    const chart = screen.getByTestId("area-chart");

    expect(chart).toBeInTheDocument();

    // You can add more specific assertions related to the chart rendering if needed
  });

  it("should render an area chart with custom chartProps", async () => {
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
        <AreaChartBase
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

    const chart = screen.getByTestId("area-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom chartProps if needed
  });

  it("should render an area chart with custom plotOptions", async () => {
    const series = [
      { name: "Series 1", data: [10, 20, 30] },
      { name: "Series 2", data: [5, 15, 25] },
    ];
    const labels = ["Label 1", "Label 2", "Label 3"];

    const customPlotOptions = {
      area: {
        fillTo: "origin",
      },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <AreaChartBase
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

    const chart = screen.getByTestId("area-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom plotOptions if needed
  });

  it("should render a area chart with custom yaxis for multiple axes", async () => {
    const series = [{ name: "Series 1", data: [10, 20, 30, 40] }];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];

    const customYAxis = [
      { labels: { style: { colors: "#FF5733" } } },
      { labels: { style: { colors: "#3352FF" } } },
    ];

    render(
      <ThemeProvider theme={legionTheme}>
        <AreaChartBase
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

    const chart = screen.getByTestId("area-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom yaxis if needed
  });
});
