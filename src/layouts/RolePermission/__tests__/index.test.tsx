import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import configureStore from "redux-mock-store";
import RolePermission from "../index";
import { PERMISSION } from "src/config/permissions";

const mockStore = configureStore();

const props = {
  profile: {
    id: "user-id",
    ldap_id: null,
    role: ["superadmin"],
    menu: [
      {
        resource_name: "Dashboard",
        slug: "dashboard",
        sequence: 1,
        path: "dashboard",
        child: [
          {
            resource_name: "Infrastructure",
            slug: "infrastructure",
            sequence: 1,
            path: "dashboard/infrastructure",
            child: [],
          },
        ],
      },
      {
        resource_name: "Admin",
        slug: "admin",
        sequence: 1,
        path: "admin",
        child: [
          {
            resource_name: "Role",
            slug: "role",
            sequence: 1,
            path: "admin/role",
            child: [],
          },
          {
            resource_name: "Resource",
            slug: "resource",
            sequence: 1,
            path: "admin/resource",
            child: [],
          },
          {
            resource_name: "User",
            slug: "user",
            sequence: 1,
            path: "admin/user",
            child: [],
          },
        ],
      },
      {
        resource_name: "TREG",
        slug: "treg",
        sequence: 2,
        path: "treg",
        child: [
          {
            resource_name: "TREG Management View",
            slug: "treg-management-view",
            sequence: 1,
            path: "treg/treg-management-view",
            child: [
              {
                resource_name: "TREG Month To Date",
                slug: "treg-month-to-date",
                sequence: 1,
                path: "treg/treg-management-view/treg-month-to-date",
                child: [],
              },
              {
                resource_name: "TREG Quartal To Date",
                slug: "treg-quartal-to-date",
                sequence: 2,
                path: "treg/treg-management-view/treg-quartal-to-date",
                child: [],
              },
              {
                resource_name: "TREG Year To Date",
                slug: "treg-year-to-date",
                sequence: 3,
                path: "treg/treg-management-view/treg-year-to-date",
                child: [],
              },
            ],
          },
        ],
      },
      {
        resource_name: "BUD",
        slug: "bud",
        sequence: 3,
        path: "bud",
        child: [],
      },
      {
        resource_name: "Customer",
        slug: "customer",
        sequence: 4,
        path: "customer",
        child: [
          {
            resource_name: "Active Customer",
            slug: "active-customer",
            sequence: 1,
            path: "customer/active-customer",
            child: [],
          },
          {
            resource_name: "Active Customer By Segment",
            slug: "active-customer-by-segment",
            sequence: 2,
            path: "customer/active-customer-by-segment",
            child: [],
          },
        ],
      },
    ],
  },
};
const store = mockStore({
  user: {
    profile: props.profile,
  },
  /* your mock store state */
});

jest.mock("src/layouts/site", () => {
  return {
    __esModule: true,
    default: ({ children }: any) => {
      return <div>{children}</div>;
    },
  };
});
jest.mock("src/layouts/header", () => {
  return {
    __esModule: true,
    default: ({ children }: any) => {
      return <div>{children}</div>;
    },
  };
});

describe("RolePermission", () => {
  it("renders children when user has the required permission", () => {
    const initialState = {
      user: {
        profile: {
          ...props.profile,
          permissions: [PERMISSION.ADMIN_ADD],
        },
      },
    };

    const store = mockStore(initialState);

    render(
      <ThemeProvider theme={legionTheme}>
        <Provider store={store}>
          <RolePermission role={PERMISSION.ADMIN_ADD}>
            <div>Children content</div>
          </RolePermission>
        </Provider>
      </ThemeProvider>
    );

    const childrenContent = screen.getByText("Children content");
    expect(childrenContent).toBeInTheDocument();
  });

  it("renders fallback content when user does not have the required permission", () => {
    const initialState = {
      user: {
        profile: {
          ...props.profile,
          permissions: [],
        },
      },
    };

    const store = mockStore(initialState);

    render(
      <ThemeProvider theme={legionTheme}>
        <Provider store={store}>
          <RolePermission role={PERMISSION.ADMIN_ADD}>
            <div>Children content</div>
          </RolePermission>
        </Provider>
      </ThemeProvider>
    );

    const errorMessage = screen.getByText("You dont have access to this page");
    expect(errorMessage).toBeInTheDocument();
  });
});
