import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppProviders } from "./contexts/AppProviders";
import "./assets/index.css";

import Layout from "./layouts/layout";
import HomePage from "./pages/home/home.page";
import RotateLoading from "./components/loadings/rotate.loading";

const DoctorLayout = lazy(() => import("./doctor/layouts/layout"))
const DoctorHomePage = lazy(() => import("./doctor/pages/home/home.page"))
const DoctorLoginPage = lazy(() => import("./doctor/pages/login/login.page"))
const DoctorAppointmentPage = lazy(() => import("./doctor/pages/appointment/appointment.page"))

const LoginPage = lazy(() => import("./pages/login/login.page"));
const RegisterPage = lazy(() => import("./pages/register/register.page"));
const AccountPage = lazy(() => import("./pages/account/account.page"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "auth/login",
        Component: LoginPage,
      },
      {
        path: "auth/register",
        Component: RegisterPage,
      },
      {
        path: "page/account",
        Component: AccountPage
      }
    ],
  },
  {
    path: "/doctor",
    Component: DoctorLayout,
    children: [
      { index: true, Component: DoctorHomePage },
      {
        path: "auth/login",
        Component: DoctorLoginPage
      },
      {
        path: "appointments",
        Component: DoctorAppointmentPage
      },
    ]
  }
]);

// Render app
createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <Suspense fallback={<RotateLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  </AppProviders>
);
