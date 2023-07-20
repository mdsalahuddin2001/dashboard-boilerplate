import React, { useEffect } from "react";
import useAuthCheck from "../../hooks/useAuth";
const Protect = ({ children }) => {
  const isAuthChecked = useAuthCheck();

  return !isAuthChecked ? "checking authentication" : <>{children}</>;
};

export default Protect;
