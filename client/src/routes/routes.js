import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Reactify from "../pages/Reactify";
import Navbar from "../components/Navbar";
const routes = [
    {
        path: "/",
        exact: true,
        element: <Home />,
        private: false,
    },
    {
        path: "/app",
        exact: true,
        element: <Reactify />,
        private: false,
    },
];

export default function Navigation() {
    return (
        <>
            <Navbar />
            <Routes>
                {routes.map((route, index) => (
                    <>
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    </>
                ))}
            </Routes>
        </>
    );
}
