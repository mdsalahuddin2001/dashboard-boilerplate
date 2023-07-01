import React, { lazy } from "react";
import Register from "../pages/authentication/Register";
import VerifyEmail from "../pages/authentication/VerifyEmail";
const Index = lazy(() => import("../pages/Index"));
const Login = lazy(() => import("../pages/authentication/Login"));
const Notes = lazy(() => import("../pages/Apps/Notes"));
const ERROR404 = lazy(() => import("../pages/Pages/Error404"));
const VerifyEmailMessage = lazy(() => import("../pages/authentication/VerifyEmailMessage"));
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
    path: "*",
    element: <ERROR404 />,
    layout: "blank",
  },
];

export { routes };
