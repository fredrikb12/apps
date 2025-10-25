import * as React from "react";
import { Navigate, Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <Navigate to="/todos" />,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}
