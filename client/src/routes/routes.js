import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"; 
import Reactify from "../pages/Reactify"; 
const routes = [
  {
    path: "/home",
    exact: true,
    element: <Home />,
    private: false,
  },
  {
    path: "/reactify",
    exact: true,
    element: <Reactify />,
    private: false,
  },
];

export default function Navigation() {
  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <>
            <Route key={index} path={route.path} element={route.element} />
          </>
        ))}
      </Routes>
    </>
  );
}
