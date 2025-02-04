import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen } from "@testing-library/react";
import Maintenance from "../index";

jest.mock(
  "src/assets/customer-service-big.png",
  () => "customer-service-big.png"
);
jest.mock("src/layouts/site", () => {
  return {
    __esModule: true, // this property makes it work
    default: ({ children }: any) => {
      return <div>{children}</div>;
    },
  };
});

describe("Maintenance Component", () => {
  it("should render the maintenance page with the correct content", () => {
    render(
      <ThemeProvider theme={legionTheme}>
        <Maintenance />
      </ThemeProvider>
    );

    // Assert that the image is rendered
    const image = screen.getByAltText("Maintenance");
    expect(image).toBeInTheDocument();

    // Assert that the heading and paragraph are rendered with the correct text
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /we are currently performing maintenance/i,
    });
    const paragraph = screen.getByText(
      /we're making the system more awesome\.we'll be back shortly\. thank you for your patience\!/i
    );
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();

    // Assert that the three sections with icons and content are rendered
    const sections = screen.getAllByRole("faq-section");
    expect(sections).toHaveLength(3);

    sections.forEach((section, index) => {
      // Assert that each section contains an icon, heading, and paragraph
      const icon = screen.getByTestId(`section-icon-${index}`);

      expect(icon).toBeInTheDocument();
    });
  });
});
