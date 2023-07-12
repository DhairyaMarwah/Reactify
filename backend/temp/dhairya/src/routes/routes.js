
    import React, { useState, useEffect } from "react";
                import { Routes, Route } from "react-router-dom";
                // import pages name dynamically from the pages directory
                import Home from "../pages/Home";
import About from "../pages/About";
                const routes = [
                {
                            path: "/home",
                            exact: true,
                            element: <Home />,
                            private: false,
                        },
{
                            path: "/about",
                            exact: true,
                            element: <About />,
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

                    )
                }
            
    