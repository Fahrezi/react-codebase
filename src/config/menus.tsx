const MENUS = {
  HOME: "/",
  PROFILE: "/profile",
  AUTHENTICATION_LOGIN: "/authentication/login",
  AUTHENTICATION_LOGIN_VERIFY_OTP: "/authentication/login/verify-otp",
  AUTHENTICATION_REGISTER: "/authentication/register",
  AUTHENTICATION_REGISTER_VERIFY_OTP: "/authentication/register/verify-otp",
  AUTHENTICATION_REGISTER_WITH_MAIL_SERVICE:
    "/authentication/register-with-mail-service",
  AUTHENTICATION_REGISTER_CONFIRM: "/authentication/register-confirm",
  AUTHENTICATION_FORGOT_PASSWORD: "/authentication/forgot-password",
  AUTHENTICATION_RESET_PASSWORD: "/authentication/reset-password",
  AUTHENTICATION_INTEGRATION: "/authentication/integration",

  // Dashboard
  DASHBOARD: "/dashboard",
  DASHBOARD_INFRASTRUCTURE: "/dashboard/infrastructure",

  // Admin
  ADMIN: "/admin",
  ADMIN_USER: "/admin/user",
  ADMIN_BATCH_REGISTER: "/admin/user/batch-register",
  ADMIN_DETAIL_USER: "/admin/user/detail-user",
  ADMIN_ROLE_USER: "/admin/role",
  ADMIN_ROLE_USER_EDIT: "/admin/role-user/edit",
  // ADMIN_ROLE_USER_CREATE: "/admin/role-user/create",
  ADMIN_RESOURCE: "/admin/resource",
  ADMIN_RESOURCE_EDIT: "/admin/resource/edit",

  // Utility
  UTILITY: "/utility",
  UTILITY_STARTING_PAGE: "/utility/starting-page",
  UTILITY_MAINTENANCE: "/utility/maintenance",
  UTILITY_ERROR_NOT_FOUND: "/utility/error-not-found",
  UTILITY_ERROR_SERVER: "/utility/error-server",

  // Showcase - Development Needs
  SHOWCASE: "/showcase",
};

export default MENUS;
