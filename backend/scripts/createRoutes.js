module.exports = function createRoutes(pages) {
    return `
    import React, { useState, useEffect } from "react";
                import { Routes, Route } from "react-router-dom";
                // import pages name dynamically from the pages directory
                ${pages
                    .map(
                        (page) =>
                            `import ${page.name} from "../pages/${page.name}";`
                    )
                    .join("\n")}
                const routes = [
                ${pages
                    .map(
                        (page) =>
                            `{
                            path: "/${page.name.toLowerCase()}",
                            exact: true,
                            element: <${page.name} />,
                            private: false,
                        },`
                    )
                    .join("\n")}
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
            
    `;
};
