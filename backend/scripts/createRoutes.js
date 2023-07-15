module.exports = function createRoutes(pages) {
    return `
    import React, { useState, useEffect } from "react";
                import { Routes, Route } from "react-router-dom";
                import Tabs from "../components/Tabs";
                import ReactifyHeader from "../components/ReactifyHeader";
                import ReactifyFooter from "../components/ReactifyFooter";
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
                            name: "${page.name}",
                            element: <${page.name} />,
                            private: false,
                        },`
                    )
                    .join("\n")}
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

                    )
                }
            
    `;
};
