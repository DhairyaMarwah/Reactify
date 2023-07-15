import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Tabs = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    const activeRoute = routes.find(
      (route) => route.path === location.pathname
    );
    if (activeRoute) {
      setActive(activeRoute.name.toLowerCase());
    }
  }, [location, routes]);

  return (
    <div className="tabs | max-container">
      {routes.map((route, index) => {
        const isActive = active === route.name.toLowerCase();
        return (
          <div
            key={index}
            onClick={() => navigate(route.path)}
            className={`tab ${isActive ? "active" : ""}`}
          >
            {route.name}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
