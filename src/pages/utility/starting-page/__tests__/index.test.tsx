import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen } from "@testing-library/react";
import StartingPage from "../index";

jest.mock("src/layouts/site", () => {
  return {
    __esModule: true, // this property makes it work
    default: ({ children }: any) => {
      return <div>{children}</div>;
    },
  };
});

describe("StartingPage Component", () => {
  it("should render the starting page with the correct title", () => {
    render(
      <ThemeProvider theme={legionTheme}>
        <StartingPage />
      </ThemeProvider>
    );

    // Assert that the heading is rendered with the correct text
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /title page/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
