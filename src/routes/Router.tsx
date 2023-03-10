import React, { FunctionComponent } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import SigninPage from "../pages/auth/signin/";
import NotFoundPage from "../pages/main/not-found";
import FieldPage from "../pages/main/field";

const _Router: FunctionComponent = () => {
  // @ts-ignore
  // @ts-ignore
  return (
    <Routes>
      <Route path="" element={<Navigate to="/welcome" />} />

      <Route path="/not-found" element={<NotFoundPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SigninPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/fields"
          element={
            <div>
              <FieldPage />
            </div>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default _Router;
