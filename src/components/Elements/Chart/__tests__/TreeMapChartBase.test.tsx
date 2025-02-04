import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { act, render, screen } from "@testing-library/react";
import TreeMapChartBase from "../TreeMapChartBase";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid='tree-map-chart' />;
    },
  };
});

describe("TreeMapChartBase Component", () => {
  it("should render a tree map chart with the specified series", async () => {
    const series = [
      {
        name: "Category 1",
        data: [
          { x: "Subcategory 1", y: 10 },
          { x: "Subcategory 2", y: 20 },
        ],
      },
      {
        name: "Category 2",
        data: [
          { x: "Subcategory 3", y: 15 },
          { x: "Subcategory 4", y: 25 },
        ],
      },
    ];

    render(
      <ThemeProvider theme={legionTheme}>
        <TreeMapChartBase series={series} />
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

    const chart = screen.getByTestId("tree-map-chart");

    expect(chart).toBeInTheDocument();

    // You can add more specific assertions related to the chart rendering if needed
  });

  it("should render a tree map chart with custom chartProps", async () => {
    const series = [
      {
        name: "Category 1",
        data: [
          { x: "Subcategory 1", y: 10 },
          { x: "Subcategory 2", y: 20 },
        ],
      },
      {
        name: "Category 2",
        data: [
          { x: "Subcategory 3", y: 15 },
          { x: "Subcategory 4", y: 25 },
        ],
      },
    ];

    const customChartProps = {
      colors: ["#FF5733", "#3352FF"],
      dataLabels: { enabled: false },
      tooltip: { enabled: true },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <TreeMapChartBase series={series} chartProps={customChartProps} />
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

    const chart = screen.getByTestId("tree-map-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom chartProps if needed
  });

  it("should render a tree map chart with custom tooltip", async () => {
    const series = [
      {
        name: "Category 1",
        data: [
          { x: "Subcategory 1", y: 10 },
          { x: "Subcategory 2", y: 20 },
        ],
      },
    ];

    const customTooltip = {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    };

    render(
      <ThemeProvider theme={legionTheme}>
        <TreeMapChartBase
          series={series}
          chartProps={{ tooltip: customTooltip }}
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

    const chart = screen.getByTestId("tree-map-chart");

    expect(chart).toBeInTheDocument();

    // You can add assertions for the custom tooltip if needed
  });
});
