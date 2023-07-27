import React, { lazy } from "react";
import Register from "../pages/authentication/Register";
import VerifyEmail from "../pages/authentication/VerifyEmail";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import AllUser from "../pages/users/AllUser";
const Categories = lazy(() => import("../pages/categoris/Categories"));
const Index = lazy(() => import("../pages/Index"));
const Login = lazy(() => import("../pages/authentication/Login"));
const ResetPassword = lazy(
  () => import("../pages/authentication/ResetPassword")
);
const Notes = lazy(() => import("../pages/Apps/Notes"));
const ERROR404 = lazy(() => import("../pages/Pages/Error404"));
const VerifyEmailMessage = lazy(
  () => import("../pages/authentication/VerifyEmailMessage")
);
const routes = [
  // dashboard
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth/login",
    element: <Login />,
    layout: "blank",
  },
  {
    path: "/auth/register",
    element: <Register />,
    layout: "blank",
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
    layout: "blank",
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
    layout: "blank",
  },
  {
    path: "/auth/register/verify-email",
    element: <VerifyEmail />,
    layout: "blank",
  },
  {
    path: "/auth/register/verification",
    element: <VerifyEmailMessage />,
    layout: "blank",
  },
  {
    path: "/apps/notes",
    element: <Notes />,
  },
  {
    path: "/users",
    element: <AllUser />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "*",
    element: <ERROR404 />,
    layout: "blank",
  },
];

export { routes };
