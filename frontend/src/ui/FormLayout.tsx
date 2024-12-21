import React from "react";
import { Outlet } from "react-router";

const FormLayout: React.FC = () => {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-blue-400">
      <Outlet />
    </main>
  );
};

export default FormLayout;
