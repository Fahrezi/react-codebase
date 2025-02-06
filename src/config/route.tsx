import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Spinner, Flex } from "@legion-ui/core";
import MENUS from "./menus";
// import Infrastructure from "src/pages/dashboard/infrastructure";
import AuthProvider from "src/layouts/AuthProvider";
import HomePage from "src/pages/HomePage";
import RolePermission from "src/layouts/RolePermission";
import { PERMISSION } from "./permissions";

// Pages Authentication
const AuthenticationLogin = React.lazy(
  () => import("src/pages/authentication/Login")
);
// const AuthenticationLoginVerifyOtp = React.lazy(
//   () => import("src/pages/authentication/verify-otp")
// );
// const AuthenticationLoginTelkom = React.lazy(
//   () => import("src/pages/authentication/login-telkom")
// );
// const AuthenticationRegister = React.lazy(
//   () => import("src/pages/authentication/register")
// );
// const AuthenticationRegisterVerifyOtp = React.lazy(
//   () => import("src/pages/authentication/verify-otp")
// );
// const AuthenticationRegisterWithMailService = React.lazy(
//   () => import("src/pages/authentication/register-with-mail-service")
// );
// const AuthenticationRegisterConfirm = React.lazy(
//   () => import("src/pages/authentication/register-confirm")
// );
// const AuthenticationForgotPassword = React.lazy(
//   () => import("src/pages/authentication/forgot-password")
// );
// const AuthenticationResetPassword = React.lazy(
//   () => import("src/pages/authentication/reset-password")
// );
// const AuthenticationIntegration = React.lazy(
//   () => import("src/pages/authentication/integration")
// );

// page profile
// const Profile = React.lazy(() => import("src/pages/authentication/profile"));

// Page Admin
// const Admin = React.lazy(() => import("../pages/admin/admin"));
// const AdminDetailUser = React.lazy(() => import("../pages/admin/detail-user"));
// const BatchRegister = React.lazy(() => import("../pages/admin/batch-register"));
// const RoleUser = React.lazy(() => import("../pages/admin/role"));
// const RoleUserEdit = React.lazy(
//   () => import("../pages/admin/role/detail-role")
// );
// const Resource = React.lazy(() => import("../pages/admin/resource"));
// const ResourceEdit = React.lazy(
//   () => import("../pages/admin/resource/detail-resource")
// );

// Pages Utility
// const StartingPage = React.lazy(() => import("../pages/utility/starting-page"));
// const Maintenance = React.lazy(() => import("../pages/utility/maintenance"));
const ErrorNotFound = React.lazy(
  () => import("src/pages/utility/ErrorNotFound")
);
const ErrorServer = React.lazy(() => import("src/pages/utility/ErrorServer"));

const LoadingComponent = (
  <Flex alignX='center' alignY='center' height='100vh'>
    <Spinner data-testid='spinner' />
  </Flex>
);

const router = createBrowserRouter([
  {
    path: MENUS.HOME,
    element: <AuthenticationLogin />,
  },
  // {
  //   path: MENUS.AUTHENTICATION_LOGIN,
  //   element: <AuthenticationLogin />,
  // },
  // {
  //   path: MENUS.AUTHENTICATION_LOGIN_VERIFY_OTP,
  //   element: <AuthenticationLoginVerifyOtp />,
  // },
  // {
  //   path: MENUS.AUTHENTICATION_REGISTER,
  //   element: <AuthenticationRegister />,
  // },
  // {
  //   path: MENUS.AUTHENTICATION_REGISTER_VERIFY_OTP,
  //   element: <AuthenticationRegisterVerifyOtp />,
  // },
  // {
  //   path: MENUS.AUTHENTICATION_REGISTER_WITH_MAIL_SERVICE,
  //   element: <AuthenticationRegisterWithMailService />,
  // },
  // {
  //   path: `${MENUS.AUTHENTICATION_REGISTER_CONFIRM}/:token`,
  //   element: <AuthenticationRegisterConfirm />,
  // },
  // {
  //   path: MENUS.AUTHENTICATION_FORGOT_PASSWORD,
  //   element: <AuthenticationForgotPassword />,
  // },
  // {
  //   path: `${MENUS.AUTHENTICATION_RESET_PASSWORD}/:token`,
  //   element: <AuthenticationResetPassword />,
  // },
  // {
  //   path: `${MENUS.AUTHENTICATION_INTEGRATION}/:token/:accessKey`,
  //   element: <AuthenticationIntegration />,
  // },
  // PROFILE
  // {
  //   path: MENUS.PROFILE,
  //   element: (
  //     <AuthProvider>
  //       <Profile />
  //     </AuthProvider>
  //   ),
  // },
  // DASHBOARD
  {
    path: MENUS.DASHBOARD,
    element: (
      <AuthProvider>
        <RolePermission role={PERMISSION.INFRASTRUCTURE_VIEW}>
          <HomePage />
        </RolePermission>
      </AuthProvider>
    ),
  },

  // ADMIN
  // {
  //   path: MENUS.ADMIN_USER,
  //   element: (
  //     <AuthProvider>
  //       <RolePermission role={PERMISSION.USER_VIEW}>
  //         <Admin />
  //       </RolePermission>
  //     </AuthProvider>
  //   ),
  // },
  // {
  //   path: MENUS.ADMIN_BATCH_REGISTER,
  //   element: (
  //     <AuthProvider>
  //       <RolePermission role={PERMISSION.USER_ADD}>
  //         <BatchRegister />
  //       </RolePermission>
  //     </AuthProvider>
  //   ),
  // },
  // {
  //   path: `${MENUS.ADMIN_DETAIL_USER}/:id`,
  //   element: (
  //     <AuthProvider>
  //       <RolePermission role={PERMISSION.USER_EDIT}>
  //         <AdminDetailUser />
  //       </RolePermission>
  //     </AuthProvider>
  //   ),
  // },
  // {
  //   path: MENUS.ADMIN_ROLE_USER,
  //   element: (
  //     <AuthProvider>
  //       <RolePermission role={PERMISSION.ROLE_VIEW}>
  //         <RoleUser />
  //       </RolePermission>
  //     </AuthProvider>
  //   ),
  // },
  // {
  //   path: `${MENUS.ADMIN_ROLE_USER_EDIT}/:idRole`,
  //   element: (
  //     <AuthProvider>
  //       <RolePermission role={PERMISSION.ROLE_EDIT}>
  //         <RoleUserEdit />
  //       </RolePermission>
  //     </AuthProvider>
  //   ),
  // },
  // {
  //   path: MENUS.ADMIN_RESOURCE,
  //   element: (
  //     <AuthProvider>
  //       <RolePermission role={PERMISSION.RESOURCE_VIEW}>
  //         <Resource />
  //       </RolePermission>
  //     </AuthProvider>
  //   ),
  // },
  // {
  //   path: `${MENUS.ADMIN_RESOURCE_EDIT}/:idResource`,
  //   element: (
  //     <AuthProvider>
  //       <RolePermission role={PERMISSION.RESOURCE_EDIT}>
  //         <ResourceEdit />
  //       </RolePermission>
  //     </AuthProvider>
  //   ),
  // },
  // Pages Utility
  {
    path: MENUS.UTILITY_ERROR_NOT_FOUND,
    element: (
      <AuthProvider>
        <ErrorNotFound />
      </AuthProvider>
    ),
  },
  {
    path: MENUS.UTILITY_ERROR_SERVER,
    element: (
      <AuthProvider>
        <ErrorServer />
      </AuthProvider>
    ),
  },
  {
    path: "*",
    element: <ErrorNotFound />,
  },
  // {
  //   path: MENUS.UTILITY_MAINTENANCE,
  //   element: (
  //     <AuthProvider>
  //       <Maintenance />
  //     </AuthProvider>
  //   ),
  // },
  // {
  //   path: MENUS.UTILITY_STARTING_PAGE,
  //   element: (
  //     <AuthProvider>
  //       <StartingPage />
  //     </AuthProvider>
  //   ),
  // },
]);

const AppRoute = () => (
  <Suspense fallback={LoadingComponent}>
    <RouterProvider router={router} />
  </Suspense>
);

export default AppRoute;
