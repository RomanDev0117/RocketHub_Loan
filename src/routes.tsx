import { createBrowserRouter } from "react-router-dom";
import { RouteErrorBoundary } from "./components/ErrorBoundary/RouteErrorBoundary";
import { Layout } from "./components/Layout/Layout";
import AuthGuard from "./components/guards/AuthGuard/AuthGuard";
import HomePage from "./screens/pages/HomePage";
import { ROUTE } from "./types/routeTypes";

// TODO: add routes lazy loading
export const router = createBrowserRouter([
  {
    element: <Layout />,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      {
        path: ROUTE.HOME,
        element: <AuthGuard fallback={<HomePage />} />,
        children: [{ index: true, element: <HomePage /> }],
      },
    ],
  },
]);
