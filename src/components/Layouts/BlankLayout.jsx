import React, { useEffect } from "react";
import App from "../../App";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BlankLayout = ({ children }) => {
  const isAuthenticated = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <App>
      <div className="text-black dark:text-white-dark min-h-screen">
        {children}{" "}
      </div>
    </App>
  );
};

export default BlankLayout;
