import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/AuthPages/Login/Login";
import Register from "../Pages/AuthPages/Reegister/Register";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import paymentCancelled from "../Pages/Dashboard/Payment/paymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <p>Loading.....</p>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "rider",
        element: (
          <PrivateRoutes>
            <Rider />
          </PrivateRoutes>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "sendParcel",
        element: (
          <PrivateRoutes>
            <SendParcel />
          </PrivateRoutes>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },

      {
        path: "parcelTrack/:trackingId",
        Component: ParcelTrack,
      },
    ],
  },

  //==============================================================================//
  // Auth Layout Route
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  //==============================================================================//
  // Dashboard Layout Route
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: paymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },

      //==============================================================================//
      // Rider Related Route
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries />
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries />
          </RiderRoute>
        ),
      },

      //==============================================================================//
      //Admin related Route
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders />
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
