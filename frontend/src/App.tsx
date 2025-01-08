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
import RequireAuth from "./page/RequireAuth";
import PersistLogin from "./page/PersistLogin";

const ROLES = {
  Admin: 5150,
  User: 2001,
  Editor: 1984,
};

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
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/" element={<Home />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                <Route path="editor" element={<Editor />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="admin" element={<Admin />} />
              </Route>

              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
                }
              >
                <Route path="lounge" element={<Lounge />} />
              </Route>
            </Route>

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
