import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import WelcomePage from "../pages/welcome";
import SigninPage from "../pages/auth/signin/";
import NotFoundPage from "../pages/main/not-found";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "../pages/main/dashboard";
import FieldPage from "../pages/main/field";
import { Layout } from "antd";

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />

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

        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Layout>
  );
};

export default Router;
