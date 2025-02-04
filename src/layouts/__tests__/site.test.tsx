import { ThemeProvider } from "@emotion/react";
import { legionTheme } from "@legion-ui/core";
import { render, screen, fireEvent } from "@testing-library/react";
import Site from "../site";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureMockStore();

const props = {
  profile: {
    id: "user-id",
    ldap_id: null,
    role: ["superadmin"],
    permissions: [
      "TREG_MANAGEMENT_VIEW_ADD",
      "TREG_MANAGEMENT_VIEW_VIEW",
      "TREG_MANAGEMENT_VIEW_EDIT",
      "TREG_MANAGEMENT_VIEW_DELETE",
      "TREG_MONTH_TO_DATE_ADD",
      "TREG_MONTH_TO_DATE_VIEW",
      "TREG_MONTH_TO_DATE_EDIT",
      "TREG_MONTH_TO_DATE_DELETE",
      "WORKLOAD_ANALYTICS_DASHBOARD_ADD",
      "WORKLOAD_ANALYTICS_DASHBOARD_VIEW",
      "WORKLOAD_ANALYTICS_DASHBOARD_EDIT",
      "WORKLOAD_ANALYTICS_DASHBOARD_DELETE",
      "TREG_QUARTAL_TO_DATE_ADD",
      "TREG_QUARTAL_TO_DATE_VIEW",
      "TREG_QUARTAL_TO_DATE_EDIT",
      "TREG_QUARTAL_TO_DATE_DELETE",
      "DASHBOARD_ADD",
      "DASHBOARD_VIEW",
      "DASHBOARD_EDIT",
      "DASHBOARD_DELETE",
      "ACTIVE_CUSTOMER_ADD",
      "ACTIVE_CUSTOMER_VIEW",
      "ACTIVE_CUSTOMER_EDIT",
      "ACTIVE_CUSTOMER_DELETE",
      "INFRASTRUCTURE_ADD",
      "INFRASTRUCTURE_EDIT",
      "INFRASTRUCTURE_VIEW",
      "INFRASTRUCTURE_DELETE",
      "ROLE_ADD",
      "ROLE_VIEW",
      "ROLE_EDIT",
      "ROLE_DELETE",
      "TREG_ADD",
      "TREG_VIEW",
      "TREG_EDIT",
      "TREG_DELETE",
      "TREG_YEAR_TO_DATE_ADD",
      "TREG_YEAR_TO_DATE_VIEW",
      "TREG_YEAR_TO_DATE_EDIT",
      "TREG_YEAR_TO_DATE_DELETE",
      "ACTIVE_CUSTOMER_BY_SEGMENT_ADD",
      "ACTIVE_CUSTOMER_BY_SEGMENT_VIEW",
      "ACTIVE_CUSTOMER_BY_SEGMENT_EDIT",
      "ACTIVE_CUSTOMER_BY_SEGMENT_DELETE",
      "ADMIN_ADD",
      "ADMIN_VIEW",
      "ADMIN_EDIT",
      "ADMIN_DELETE",
      "RESOURCE_ADD",
      "RESOURCE_VIEW",
      "RESOURCE_EDIT",
      "RESOURCE_DELETE",
      "BUD_ADD",
      "BUD_VIEW",
      "BUD_EDIT",
      "BUD_DELETE",
      "CUSTOMER_ADD",
      "CUSTOMER_VIEW",
      "CUSTOMER_EDIT",
      "CUSTOMER_DELETE",
      "USER_ADD",
      "USER_VIEW",
      "USER_EDIT",
      "USER_DELETE",
    ],
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
    iat: 1699936272,
    exp: 1699936332,
    aud: "http://localhost:9111/codebase",
    iss: "http://localhost:9111/codebase/v1/login",
  },
};
const store = mockStore({
  user: {
    profile: props.profile,
  },
  /* your mock store state */
});

const mockedUsedNavigate = jest.fn();
const mockedLocation = {
  pathname: "/your-mocked-path",
  // other properties...
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockedLocation,
}));

describe("Site Component", () => {
  it("should render the logo", () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={legionTheme}>
          <Provider store={store}>
            <Site {...props}>{<div>Children</div>}</Site>
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    );
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });
});
