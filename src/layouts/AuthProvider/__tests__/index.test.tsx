import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";
import AuthProvider from "../index";
import MENUS from "src/config/menus";
import { useAppSelector } from "src/store";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore();

const props = {
  isAuthenticated: false,
};
const store = mockStore({
  user: {
    isAuthenticated: props.isAuthenticated,
  },
  /* your mock store state */
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useNavigate: () => mockNavigate,
}));

describe("AuthProvider", () => {
  it("renders spinner when not authenticated", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider theme={legionTheme}>
          <Provider store={store}>
            <AuthProvider>
              <div>Main Content</div>
            </AuthProvider>
          </Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders main content when authenticated", async () => {
    const store = mockStore({
      user: {
        isAuthenticated: true,
      },
      /* your mock store state */
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <AuthProvider>
            <div>Main Content</div>
          </AuthProvider>
        </Provider>
      </MemoryRouter>
    );

    // Wait for the component to update
    await screen.findByText("Main Content");

    // Ensure that the main content is rendered
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });

  it("redirects to login page when not authenticated", async () => {
    let store = mockStore({
      user: {
        isAuthenticated: true,
      },
      /* your mock store state */
    });

    const { rerender } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider theme={legionTheme}>
          <Provider store={store}>
            <AuthProvider>
              <div>Main Content</div>
            </AuthProvider>
          </Provider>
        </ThemeProvider>
      </MemoryRouter>
    );

    store = mockStore({
      user: {
        isAuthenticated: false,
      },
      /* your mock store state */
    });

    rerender(
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider theme={legionTheme}>
          <Provider store={store}>
            <AuthProvider>
              <div>Main Content</div>
            </AuthProvider>
          </Provider>
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith(MENUS.AUTHENTICATION_LOGIN);
  });
});
