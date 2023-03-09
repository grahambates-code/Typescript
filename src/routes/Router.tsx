import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import WelcomePage from "../pages/welcome";
import SigninPage from "../pages/auth/signin/";
import NotFoundPage from "../pages/main/not-found";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "../pages/main/dashboard";
import FieldPage from "../pages/main/field";

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/welcome" />} />
      <Route path="/welcome" element={<WelcomePage />} />

      <Route path="/not-found" element={<NotFoundPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SigninPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/fields"
          element={
            <PrivateRoute>
              <FieldPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default Router;
