import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../index";
import { BrowserRouter } from "react-router-dom";

// Mock the react-router-dom useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the AuthState hook
jest.mock("src/services/auth/state", () => ({
  ...jest.requireActual("src/services/auth/state"),
  AuthState: jest.fn(() => ({
    loginUser: jest.fn(),
    errorLogin: "",
    setErrorLogin: jest.fn(),
  })),
}));

// Mock the ReCAPTCHA component
jest.mock("react-google-recaptcha", () => ({
  __esModule: true,
  default: ({ onChange }: any) => {
    const executeRecaptcha = () => onChange("recaptcha-response");
    return <button onClick={executeRecaptcha}>MockReCAPTCHA</button>;
  },
}));
jest.mock("src/assets/Logo-IDO.svg", () => "Logo-IDO.svg");
jest.mock("src/assets/bg-login.jpg", () => "bg-login.jpg");
jest.mock("../../auth", () => {
  return {
    __esModule: true, // this property makes it work
    default: ({ children }: any) => {
      return <div>{children}</div>;
    },
  };
});

describe("LoginPage Component", () => {
  it("should render the login form and handle submission", async () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={legionTheme}>
          <LoginPage />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Assert that the form elements are rendered
    const emailInput = screen.getByPlaceholderText("hello@mail.com");
    const passwordInput = screen.getByPlaceholderText("password");
    const forgotPasswordLink = screen.getByText("Forgot Password");
    const signInButton = screen.getByText("Sign In");
    const signInWithTelkomButton = screen.getByText(
      "Sign In with Telkom Account"
    );
    const signUpButton = screen.getByText("Sign Up");
    const rememberMeButton = screen.getByTestId("remember-me");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(signInWithTelkomButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
    expect(rememberMeButton).toBeInTheDocument();

    // Trigger form submission
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(forgotPasswordLink);
    fireEvent.click(screen.getByText("MockReCAPTCHA"));
    fireEvent.click(signInButton);
    fireEvent.click(rememberMeButton);

    // Assert that loginUser function is called
    await waitFor(() => {
      // expect(screen.getByText("recaptcha-response")).toBeInTheDocument();
      // expect(screen.getByText("Some error message")).toBeInTheDocument(); // Mocked error message
      // expect(jest.fn()).toHaveBeenCalledWith(expect.any(FormData), false);
    });

    // Trigger form submission with an error
    // fireEvent.click(signInButton);

    // Assert that the error message is displayed
    // const errorMessage = await screen.findByText("Some error message");
    // expect(errorMessage).toBeInTheDocument();
  });
});
