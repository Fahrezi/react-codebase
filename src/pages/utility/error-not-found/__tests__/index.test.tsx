import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen } from "@testing-library/react";
import ErrorNotFound from "../index";

jest.mock("src/assets/not-found.png", () => "not-found.png");

describe("ErrorNotFound Component", () => {
  it("should render the error not found page with the correct content", () => {
    render(
      <ThemeProvider theme={legionTheme}>
        <ErrorNotFound />
      </ThemeProvider>
    );

    // Assert that the image is rendered
    const image = screen.getByAltText("Error Not Found");
    expect(image).toBeInTheDocument();

    // Assert that the heading and paragraph are rendered with the correct text
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /we couldn’t connect the dots/i,
    });
    const paragraph = screen.getByText(
      /this page was not found\.you may have mistyped the address or the page may have moved\./i
    );
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();

    // Uncomment the following assertions if the button is uncommented in the component
    // const button = screen.getByRole('button', { name: /back to home/i });
    // expect(button).toBeInTheDocument();
    // expect(button).toHaveAttribute('aria-label', 'Back to Home');
  });
});
