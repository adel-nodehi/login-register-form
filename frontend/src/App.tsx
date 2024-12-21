import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import FormLayout from "./ui/FormLayout";

import Register from "./page/Register";
import Login from "./page/Login";
import NotFoundPage from "./page/NotFoundPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route element={<FormLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
