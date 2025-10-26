import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProductionProvider } from "./contexts/production.context";
import "./assets/index.css";

import PatientLayout from "./layouts/patient/layout";
import PatientHomePage from "./pages/patient/home/home.page";
import RotateLoading from "./components/common/others/loading";

const AssistorLayout = lazy(() => import("./layouts/assistor/layout"));
const AssistorHomePage = lazy(() => import("./pages/assistor/home/home.page"));
const AssistorAppointmentPage = lazy(() => import("./pages/assistor/appointment/appointment.page"));
const AssistorPrescriptionInvoicePage = lazy(() => import("./pages/assistor/prescription-invoice/prescription-invoice.page"));
const AssistorServiceInvoicePage = lazy(() => import("./pages/assistor/service-invoice/service-invoice.page"));
const AssistorMedicinePage = lazy(() => import("./pages/assistor/medicine/medicine.page"));
const AssistorMedicalPackagePage = lazy(() => import("./pages/assistor/medical-package/medical-package.page"));

const DoctorLayout = lazy(() => import("./layouts/doctor/layout"));
const DoctorHomePage = lazy(() => import("./pages/doctor/home/home.page"));
const DoctorLoginPage = lazy(() => import("./pages/doctor/login/login.page"));
const DoctorAppointmentPage = lazy(() => import("./pages/doctor/appointment/appointment.page"));
const DoctorProfilePage = lazy(() => import("./pages/doctor/profile/profile.page"));
const CreatePrescriptionInvoicePage = lazy(() => import("./pages/doctor/prescription-invoice/create-prescription-invoice.page"));
const CreateServiceInvoicePage = lazy(() => import("./pages/doctor/service-invoice/create-service-invoice.page"));

const AdminLayout = lazy(() => import("./layouts/admin/layout"));
const AdminDashboardPage = lazy(() => import("./pages/admin/dashboard/dashboard.page"));
const AdminMedicineDashboardPage = lazy(() => import("./pages/admin/medicine-dashboard/medicine-dashboard.page"));
const AdminAccountPage = lazy(() => import("./pages/admin/account/account.page"));
const AdminDoctorPage = lazy(() => import("./pages/admin/doctor/doctor.page"));
const AdminAppointmentsPage = lazy(() => import("./pages/admin/appointment/appointment.page"));
const AdminDepartmentPage = lazy(() => import("./pages/admin/department/department.page"));
const AdminMedicinePage = lazy(() => import("./pages/admin/medicine/medicine.page"));
const AdminInventoryPage = lazy(() => import("./pages/admin/inventory/inventory.page"));
const AdminMedicalPackagePage = lazy(() => import("./pages/admin/medical-package/medical-package.page"));
const AdminPrescriptionInvoicePage = lazy(() => import("./pages/admin/prescription-invoice/prescription-invoice.page"));
const AdminServiceInvoicePage = lazy(() => import("./pages/admin/service-invoice/service-invoice.page"));


const LoginPage = lazy(() => import("./pages/patient/login/login.page"));
const RegisterPage = lazy(() => import("./pages/patient/register/register.page"));
const AccountPage = lazy(() => import("./pages/patient/account/account.page"));
const BookingPage = lazy(() => import("./pages/patient/booking/booking.page"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: PatientLayout,
    children: [
      { index: true, Component: PatientHomePage },
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
      },
      {
        path: "page/booking",
        Component: BookingPage
      }
    ],
  },
  {
    path: "/assistor",
    Component: AssistorLayout,
    children: [
      { index: true, Component: AssistorHomePage },
      {
        path: "appointments",
        Component: AssistorAppointmentPage
      },
      {
        path: "prescription-invoices",
        Component: AssistorPrescriptionInvoicePage
      },
      {
        path: "service-invoices",
        Component: AssistorServiceInvoicePage
      },
      {
        path: "medicines",
        Component: AssistorMedicinePage
      },
      {
        path: "medical-packages",
        Component: AssistorMedicalPackagePage
      }
    ]
  },
  {
    path: "doctor",
    Component: DoctorLayout,
    children: [
      { index: true, Component: DoctorHomePage },
      {
        path: "auth/login",
        Component: DoctorLoginPage
      },
      {
        path: "appointment",
        Component: DoctorAppointmentPage
      },
      {
        path: "create-service-invoice",
        Component: CreateServiceInvoicePage
      },
      {
        path: "create-prescription-invoice",
        Component: CreatePrescriptionInvoicePage
      },
      {
        path: "profile",
        Component: DoctorProfilePage
      }
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboardPage },
      {
        path: "medicine-dashboard",
        Component: AdminMedicineDashboardPage
      },
      {
        path: "accounts",
        Component: AdminAccountPage
      },
      {
        path: "doctors-profile",
        Component: AdminDoctorPage
      },
      {
        path: "appointments",
        Component: AdminAppointmentsPage
      },
      {
        path: "department-room",
        Component: AdminDepartmentPage
      },
      {
        path: "medicine",
        Component: AdminMedicinePage
      },
      {
        path: "inventory",
        Component: AdminInventoryPage
      },
      {
        path: "medical-package",
        Component: AdminMedicalPackagePage
      },
      {
        path: "prescription-invoice",
        Component: AdminPrescriptionInvoicePage
      },
      {
        path: "service-invoice",
        Component: AdminServiceInvoicePage
      }
    ]
  },
]);

// Render app
createRoot(document.getElementById("root")!).render(
  <ProductionProvider>
    <Suspense fallback={<RotateLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  </ProductionProvider>
);
