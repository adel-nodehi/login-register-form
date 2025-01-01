import React from "react";
import { Outlet } from "react-router";

const FormLayout: React.FC = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Outlet />
    </div>
  );
};

export default FormLayout;
