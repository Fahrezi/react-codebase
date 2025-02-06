import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen, fireEvent } from "@testing-library/react";
import TitleTooltip from "../TitleTooltip";

describe("TitleTooltip Component", () => {
  it("should render the title without a tooltip", () => {
    const title = "Title Without Tooltip";

    render(
      <ThemeProvider theme={legionTheme}>
        <TitleTooltip title={title} />
      </ThemeProvider>
    );

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const tooltipIcon = screen.queryByTestId("tooltip-icon");
    expect(tooltipIcon).not.toBeInTheDocument();
  });

  it("should render the title with a tooltip", () => {
    const title = "Title With Tooltip";
    const tooltip = "This is a tooltip text";

    render(
      <ThemeProvider theme={legionTheme}>
        <TitleTooltip title={title} tooltip={tooltip} />
      </ThemeProvider>
    );

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const tooltipIcon = screen.getByTestId("tooltip-icon");
    expect(tooltipIcon).toBeInTheDocument();

    // Trigger tooltip by hovering over the icon
    fireEvent.mouseOver(tooltipIcon);

    const tooltipText = screen.getByText(tooltip);
    expect(tooltipText).toBeInTheDocument();
  });
});
