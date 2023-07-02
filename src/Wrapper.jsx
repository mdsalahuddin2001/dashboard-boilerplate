import React from "react";
import { Outlet } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";

const Wrapper = () => {
  const isAuthChecked = useAuthCheck();

  return !isAuthChecked ? (
    "checking authentication"
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default Wrapper;
