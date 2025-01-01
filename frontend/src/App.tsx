import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import AppLayout from "./ui/AppLayout";
import FormLayout from "./ui/FormLayout";

import Register from "./page/Register";
import Login from "./page/Login";
import LinkPage from "./page/LinkPage";
import NotFoundPage from "./page/NotFoundPage";
import Unauthorized from "./page/Unauthorized";
import Home from "./page/Home";
import Editor from "./page/Editor";
import Admin from "./page/Admin";
import Lounge from "./page/Lounge";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* public routes */}
            <Route element={<FormLayout />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="link-page" element={<LinkPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* protected routes */}
            <Route path="/" element={<Home />} />
            <Route path="editor" element={<Editor />} />
            <Route path="admin" element={<Admin />} />
            <Route path="lounge" element={<Lounge />} />

            {/* catch all routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
