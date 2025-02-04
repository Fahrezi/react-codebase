import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from '@testing-library/user-event';
import ErrorServer from "../index";

jest.mock("src/assets/not-found.png", () => "not-found.png");
jest.mock("src/layouts/site", () => {
  return {
    __esModule: true, // this property makes it work
    default: ({ children }: any) => {
      return <div>{children}</div>;
    },
  };
});

describe("ErrorServer Component", () => {
  it("should render the server error page with the correct content", () => {
    render(
      <ThemeProvider theme={legionTheme}>
        <ErrorServer />
      </ThemeProvider>
    );

    // Assert that the image is rendered
    const image = screen.getByAltText("Server Error");
    expect(image).toBeInTheDocument();

    // Assert that the heading and paragraph are rendered with the correct text
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /opps, something went wrong/i,
    });
    const paragraph = screen.getByText(
      /server error\. we apologies and are fixing the problem\.please try again at a later stage\./i
    );
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();

    // Assert that the button is rendered with the correct text and icon
    const button = screen.getByRole("button", { name: /back to home/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Back to Home");
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();

    // Simulate a button click (you may need to adjust this based on your actual button click handling)
    fireEvent.click(button);

    // Add assertions related to the expected behavior after the button click
  });
});
