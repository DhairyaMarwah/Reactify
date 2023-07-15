import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import pages name dynamically from the pages directory
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ReactifyHeader from "../components/ReactifyHeader";
import ReactifyFooter from "../components/ReactifyFooter";
import Tabs from "../components/Tabs";
const routes = [
  {
    path: "/login",
    name: "Login",
    exact: true,
    element: <Login />,
    private: false,
  },
  {
    path: "/signup",
    exact: true,
    name: "Signup",
    element: <Signup />,
    private: false,
  },
];

export default function Navigation() {
  return (
    <>
      <ReactifyHeader />
      <Tabs routes={routes} />
      <Routes>
        {routes.map((route, index) => (
          <>
            <Route key={index} path={route.path} element={route.element} />
          </>
        ))}
      </Routes>
      <ReactifyFooter />
    </>
  );
}
