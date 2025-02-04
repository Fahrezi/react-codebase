import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { act, render, screen } from "@testing-library/react";
import ColumnChartBase from "../ColumnChartBase";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid='column-chart' />;
    },
  };
});

describe("ColumnChartBase Component", () => {
  it("should render a column chart with the specified series and labels", async () => {
    const series = [{ name: "Series 1", data: [10, 20, 30, 40] }];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];

    render(
      <ThemeProvider theme={legionTheme}>
        <ColumnChartBase series={series} labels={labels} />
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

    const chart = screen.getByTestId("column-chart");

    expect(chart).toBeInTheDocument();
  });

  it("should render a column chart with custom chartProps", async () => {
    const series = [{ name: "Series 1", data: [10, 20, 30, 40] }];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];

    const customChartProps = {
      height: 450,
      colors: ["#FF5733", "#3352FF"],
      legend: { show: true },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <ColumnChartBase
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

    const chart = screen.getByTestId("column-chart");

    expect(chart).toBeInTheDocument();
  });

  it("should render a column chart with custom yaxis for multiple axes", async () => {
    const series = [{ name: "Series 1", data: [10, 20, 30, 40] }];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];

    const customYAxis = [
      { labels: { style: { colors: "#FF5733" } } },
      { labels: { style: { colors: "#3352FF" } } },
    ];

    render(
      <ThemeProvider theme={legionTheme}>
        <ColumnChartBase
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

    const chart = screen.getByTestId("column-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom yaxis if needed
  });
});
