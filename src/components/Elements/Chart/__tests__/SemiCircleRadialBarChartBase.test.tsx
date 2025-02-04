import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { act, render, screen } from "@testing-library/react";
import SemiCircleRadialBarChartBase from "../SemiCircleRadialBarChartBase";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid='semi-circle-radial-bar-chart' />;
    },
  };
});

describe("SemiCircleRadialBarChartBase Component", () => {
  it("should render a semi-circle radial bar chart with the specified series", async () => {
    const series = [75];

    render(
      <ThemeProvider theme={legionTheme}>
        <SemiCircleRadialBarChartBase series={series} />
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
    const chart = screen.getByTestId("semi-circle-radial-bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add more specific assertions related to the chart rendering if needed
  });

  it("should render a semi-circle radial bar chart with custom chartProps", async () => {
    const series = [50];

    const customChartProps = {
      colors: ["#FF5733"],
      dataLabels: { enabled: true, fontSize: "18px" },
      tooltip: { enabled: true },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <SemiCircleRadialBarChartBase
          series={series}
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
    const chart = screen.getByTestId("semi-circle-radial-bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom chartProps if needed
  });

  it("should render a semi-circle radial bar chart with custom plotOptions", async () => {
    const series = [60];

    const customPlotOptions = {
      radialBar: {
        startAngle: 0,
        endAngle: 180,
      },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <SemiCircleRadialBarChartBase
          series={series}
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
    const chart = screen.getByTestId("semi-circle-radial-bar-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom plotOptions if needed
  });
});
