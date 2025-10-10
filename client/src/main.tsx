import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppProviders } from "./contexts/AppProviders";
import "./assets/index.css";

import Layout from "./layouts/layout";
import HomePage from "./pages/home/home.page";
import RotateLoading from "./components/loadings/rotate.loading";
import AssistorProtectedRouter from './assistor/pages/protected/AssistorProtectedRoute';

const DoctorLayout = lazy(() => import("./doctor/layouts/layout"));
const DoctorHomePage = lazy(() => import("./doctor/pages/home/home.page"));
const DoctorLoginPage = lazy(() => import("./doctor/pages/login/login.page"));
const DoctorAppointmentPage = lazy(() => import("./doctor/pages/appointment/appointment.page"));

const AdminLayout = lazy(() => import("./admin/layouts/layout"));

const LoginPage = lazy(() => import("./pages/login/login.page"));
const RegisterPage = lazy(() => import("./pages/register/register.page"));
const AccountPage = lazy(() => import("./pages/account/account.page"));
const AssistorLoginPage = lazy(() => import("./assistor/pages/login/AssistorLoginPage"));
const AssistorPage = lazy(() => import('./assistor/Layout'));
const AssistorHomePage = lazy(() => import('./assistor/pages/home/Home'));
const AssistorAppointment = lazy(() => import('./assistor/pages/appointment/Appointment'));

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
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      
    ]
  },
  {
    path: "/assistor/login",
    Component: AssistorLoginPage
  },
  {
    path: "/assistor",
    element: (
      <AssistorProtectedRouter>
        <AssistorPage />
      </AssistorProtectedRouter>
    ),
    children: [
      {
        index: true, Component: AssistorHomePage
      },
      {
        path: "appointments",
        Component: AssistorAppointment
      }
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
