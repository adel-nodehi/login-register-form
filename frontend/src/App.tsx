import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Register from "./page/Register";
import Login from "./page/Login";
import NotFoundPage from "./page/NotFoundPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
