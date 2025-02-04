import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen, act } from "@testing-library/react";
import StackedColumnChartCard from "../StackedColumnChartCard";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid='stacked-column-chart' />;
    },
  };
});

describe("StackedColumnChartCard Component", () => {
  it("should render the card with a spinner and then the stacked column chart", async () => {
    const series = [
      { name: "Series 1", data: [10, 20, 30, 40] },
      { name: "Series 2", data: [5, 15, 25, 35] },
    ];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];
    const chartProps = {
      height: 370,
      colors: ["#FF5733", "#3352FF"],
      legend: { show: true },
    };

    const title = "Chart Title";
    const tooltip = "Chart Tooltip";
    const headerRightColumn = <div>Header Right</div>;
    const headerRightWidth = "50%";
    const headerDivider = true;

    render(
      <ThemeProvider theme={legionTheme}>
        <StackedColumnChartCard
          series={series}
          labels={labels}
          chartProps={chartProps}
          title={title}
          tooltip={tooltip}
          headerRightColumn={headerRightColumn}
          headerRightWidth={headerRightWidth}
          headerDivider={headerDivider}
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

    // Assert that the stacked column chart is rendered
    const chart = screen.getByTestId("stacked-column-chart");
    expect(chart).toBeInTheDocument();

    // You can add more specific assertions related to the chart rendering if needed
  });
});
