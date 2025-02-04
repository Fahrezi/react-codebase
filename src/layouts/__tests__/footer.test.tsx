import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen } from "@testing-library/react";
import Footer from "../footer";
import dayjs from "dayjs";

const YEAR = dayjs().year();

describe("Footer Component", () => {
  it("should render the footer with the correct content", () => {
    render(
      <ThemeProvider theme={legionTheme}>
        <Footer />
      </ThemeProvider>
    );

    // Assert that the text content is present
    const textContent = screen.getByText(
      `${YEAR} © Dashboard Standard by Chapter DPE | Design by`
    );
    expect(textContent).toBeInTheDocument();

    // Assert that the anchor link is present with the correct text and href
    const anchorLink = screen.getByText("Legion Design System");
    expect(anchorLink).toBeInTheDocument();
    expect(anchorLink).toHaveAttribute("href", "https://legion.telkom.design");
  });

  it("should render the divider", () => {
    render(
      <ThemeProvider theme={legionTheme}>
        <Footer />
      </ThemeProvider>
    );

    // Assert that the divider is rendered
    const divider = screen.getByTestId("divider");
    expect(divider).toBeInTheDocument();
  });
});
