import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen } from "@testing-library/react";
import { CardContent } from "../CardContent";

describe("CardContent Component", () => {
  it("should render the title and children", () => {
    const title = "Card Title";
    const children = <div>Content goes here</div>;

    render(
      <ThemeProvider theme={legionTheme}>
        <CardContent title={title}>{children}</CardContent>
      </ThemeProvider>
    );

    const titleElement = screen.getByText(title);
    const childrenElement = screen.getByText("Content goes here");

    expect(titleElement).toBeInTheDocument();
    expect(childrenElement).toBeInTheDocument();
  });

  it("should render a tooltip if provided", () => {
    const title = "Card Title";
    const tooltip = "This is a tooltip";

    render(
      <ThemeProvider theme={legionTheme}>
        <CardContent title={title} tooltip={tooltip} />
      </ThemeProvider>
    );

    const titleElement = screen.getByText(title);
    const tooltipElement = screen.getByText(tooltip);

    expect(titleElement).toBeInTheDocument();
    expect(tooltipElement).toBeInTheDocument();
  });

  it("should render a headerRightColumn if provided", () => {
    const title = "Card Title";
    const headerRightColumn = <div>Header Right Column</div>;

    render(
      <ThemeProvider theme={legionTheme}>
        <CardContent title={title} headerRightColumn={headerRightColumn} />
      </ThemeProvider>
    );

    const titleElement = screen.getByText(title);
    const headerRightColumnElement = screen.getByText("Header Right Column");

    expect(titleElement).toBeInTheDocument();
    expect(headerRightColumnElement).toBeInTheDocument();
  });

  it("should render a headerDivider if headerDivider is true", () => {
    const title = "Card Title";

    render(
      <ThemeProvider theme={legionTheme}>
        <CardContent title={title} headerDivider={true} />
      </ThemeProvider>
    );

    const titleElement = screen.getByText(title);
    const dividerElement = screen.getByTestId("divider");

    expect(titleElement).toBeInTheDocument();
    expect(dividerElement).toBeInTheDocument();
  });

  it("should render card if no props", () => {
    const tooltip = "This is a tooltip";

    render(
      <ThemeProvider theme={legionTheme}>
        <CardContent tooltip={tooltip} />
      </ThemeProvider>
    );

    const tooltipElement = screen.getByText(tooltip);

    expect(tooltipElement).toBeInTheDocument();
  });
});
