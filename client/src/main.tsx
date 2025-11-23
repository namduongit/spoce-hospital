import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProductionProvider } from "./contexts/production.context";
import "./assets/index.css";

import PatientLayout from "./layouts/patient/layout";
import PatientHomePage from "./pages/patient/home/home.page";
import RotateLoading from "./components/common/others/loading";

import ProtectRoute from "./contexts/_protect-route";
import AuthDirect from "./contexts/_auth-direct";

const AssistorLayout = lazy(() => import("./layouts/assistor/layout"));
const AssistorAppointmentPage = lazy(() => import("./pages/assistor/appointment/appointment.page"));
const AssistorDoctorSchedulePage = lazy(() => import("./pages/assistor/doctor-schedule/doctor-schedule.page"));
const AssistorPrescriptionInvoicePage = lazy(() => import("./pages/assistor/prescription-invoice/prescription-invoice.page"));
const AssistorServiceInvoicePage = lazy(() => import("./pages/assistor/service-invoice/service-invoice.page"));
const AssistorMedicinePage = lazy(() => import("./pages/assistor/medicine/medicine.page"));
const AssistorMedicalPackagePage = lazy(() => import("./pages/assistor/medical-package/medical-package.page"));

const DoctorLayout = lazy(() => import("./layouts/doctor/layout"));
const DoctorAppointmentPage = lazy(() => import("./pages/doctor/appointment/appointment.page"));
const DoctorSchedulePage = lazy(() => import("./pages/doctor/schedule/schedule.page"));
const DoctorProfilePage = lazy(() => import("./pages/doctor/profile/profile.page"));
const CreatePrescriptionInvoicePage = lazy(() => import("./pages/doctor/prescription-invoice/prescription-invoice.page"));
const CreateServiceInvoicePage = lazy(() => import("./pages/doctor/service-invoice/service-invoice.page"));

const AdminLayout = lazy(() => import("./layouts/admin/layout"));
const AdminDashboardPage = lazy(() => import("./pages/admin/dashboard/dashboard.page"));
const AdminMedicineDashboardPage = lazy(() => import("./pages/admin/medicine-dashboard/medicine-dashboard.page"));
const AdminRevenueStatisticsPage = lazy(() => import("./pages/admin/revenue-statistics/revenue-statistics.page"));
const AdminAccountPage = lazy(() => import("./pages/admin/account/account.page"));
const AdminDoctorPage = lazy(() => import("./pages/admin/doctor/doctor.page"));
const AdminAppointmentsPage = lazy(() => import("./pages/admin/appointment/appointment.page"));
const AdminDepartmentPage = lazy(() => import("./pages/admin/department/department.page"));
const AdminMedicinePage = lazy(() => import("./pages/admin/medicine/medicine.page"));
const AdminInventoryPage = lazy(() => import("./pages/admin/inventory/inventory.page"));
const AdminMedicalPackagePage = lazy(() => import("./pages/admin/medical-package/medical-package.page"));
const AdminPrescriptionInvoicePage = lazy(() => import("./pages/admin/prescription-invoice/prescription-invoice.page"));
const AdminServiceInvoicePage = lazy(() => import("./pages/admin/service-invoice/service-invoice.page"));

const ServiceInvoicePayment = lazy(() => import("./components/common/payments/service-invoice.payment"));
const PrescriptionInvoicePayment = lazy(() => import("./components/common/payments/prescription-invoice.payment"));

const LoginPage = lazy(() => import("./pages/public/login/login.page"));
const RegisterPage = lazy(() => import("./pages/public/register/register.page"));
const ForgotPasswordPage = lazy(() => import("./pages/public/forgot/forgot.page"));
const AccountPage = lazy(() => import("./pages/patient/account/account.page"));
const BookingPage = lazy(() => import("./pages/patient/booking/booking.page"));

const VNPayReturnPayment = lazy(() => import("./components/common/payments/vnpay-return.payment"));
const MomoReturnPayment = lazy(() => import("./components/common/payments/momo-return.payment"));

const NotFoundPage = lazy(() => import("./pages/public/not-found/not-found.page"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: PatientLayout,
    children: [
      { index: true, Component: PatientHomePage },
      {
        path: "auth/login",
        element:
          <AuthDirect>
            <LoginPage />
          </AuthDirect>
      },
      {
        path: "auth/register",
        element:
          <AuthDirect>
            <RegisterPage />
          </AuthDirect>
      },
      {
        path: "auth/forgot-password",
        element:
          <AuthDirect>
            <ForgotPasswordPage />
          </AuthDirect>
      },
      {
        path: "page/account",
        element:
          <ProtectRoute roles={["ADMIN", "ASSISTOR"]}>
            <AccountPage />
          </ProtectRoute>
      },
      {
        path: "page/booking",
        element:
          <ProtectRoute roles={[]}>
            <BookingPage />
          </ProtectRoute>
      }
    ],
  },
  {
    path: "/assistor",
    Component: AssistorLayout,
    children: [
      {
        index: true,
        element:
          <ProtectRoute roles={["ASSISTOR"]}>
            <AssistorAppointmentPage />
          </ProtectRoute>
      },
      {
        path: "appointments",
        element:
          <ProtectRoute roles={["ASSISTOR"]}>
            <AssistorAppointmentPage />
          </ProtectRoute>
      },
      {
        path: "doctor-schedules",
        element:
          <ProtectRoute roles={["ASSISTOR"]}>
            <AssistorDoctorSchedulePage />
          </ProtectRoute>
      },
      {
        path: "prescription-invoices",
        element:
          <ProtectRoute roles={["ASSISTOR"]}>
            <AssistorPrescriptionInvoicePage />
          </ProtectRoute>
      },
      {
        path: "service-invoices",
        element:
          <ProtectRoute roles={["ASSISTOR"]}>
            <AssistorServiceInvoicePage />
          </ProtectRoute>
      },
      {
        path: "medicines",
        element:
          <ProtectRoute roles={["ASSISTOR"]}>
            <AssistorMedicinePage />
          </ProtectRoute>
      },
      {
        path: "medical-packages",
        element:
          <ProtectRoute roles={["ASSISTOR"]}>
            <AssistorMedicalPackagePage />
          </ProtectRoute>
      }
    ]
  },
  {
    path: "doctor",
    Component: DoctorLayout,
    children: [
      {
        index: true,
        element:
          <ProtectRoute roles={["DOCTOR"]}>
            <DoctorAppointmentPage />
          </ProtectRoute>
      },
      {
        path: "appointment",
        element:
          <ProtectRoute roles={["DOCTOR"]}>
            <DoctorAppointmentPage />
          </ProtectRoute>
      },
      {
        path: "schedule",
        element:
          <ProtectRoute roles={["DOCTOR"]}>
            <DoctorSchedulePage />
          </ProtectRoute>
      },
      {
        path: "service-invoice",
        element:
          <ProtectRoute roles={["DOCTOR"]}>
            <CreateServiceInvoicePage />
          </ProtectRoute>
      },
      {
        path: "prescription-invoice",
        element:
          <ProtectRoute roles={["DOCTOR"]}>
            <CreatePrescriptionInvoicePage />
          </ProtectRoute>
      },
      {
        path: "profile",
        element:
          <ProtectRoute roles={["DOCTOR"]}>
            <DoctorProfilePage />
          </ProtectRoute>
      }
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminDashboardPage />
          </ProtectRoute>
      },
      {
        path: "medicine-dashboard",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminMedicineDashboardPage />
          </ProtectRoute>
      },
      {
        path: "revenue-statistics",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminRevenueStatisticsPage />
          </ProtectRoute>
      },
      {
        path: "accounts",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminAccountPage />
          </ProtectRoute>
      },
      {
        path: "doctors-profile",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminDoctorPage />
          </ProtectRoute>
      },
      {
        path: "appointments",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminAppointmentsPage />
          </ProtectRoute>
      },
      {
        path: "department-room",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminDepartmentPage />
          </ProtectRoute>
      },
      {
        path: "medicine",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminMedicinePage />
          </ProtectRoute>
      },
      {
        path: "inventory",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminInventoryPage />
          </ProtectRoute>
      },
      {
        path: "medical-package",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminMedicalPackagePage />
          </ProtectRoute>
      },
      {
        path: "prescription-invoice",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminPrescriptionInvoicePage />
          </ProtectRoute>
      },
      {
        path: "service-invoice",
        element:
          <ProtectRoute roles={["ADMIN"]}>
            <AdminServiceInvoicePage />
          </ProtectRoute>
      }
    ]
  },
  {
    path: "payment/service-invoice/:id",
    Component: ServiceInvoicePayment
  },
  {
    path: "payment/prescription-invoice/:id",
    Component: PrescriptionInvoicePayment
  },
  {
    path: "api/payment/vnpay-return",
    Component: VNPayReturnPayment
  },
  {
    path: "api/payment/momo-return",
    Component: MomoReturnPayment
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

// Render app
createRoot(document.getElementById("root")!).render(
  <ProductionProvider>
    <Suspense fallback={<RotateLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  </ProductionProvider>
);
