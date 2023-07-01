import React from "react";
import Wrapper from "./Wrapper";
import useAuthCheck from "./hooks/useAuthCheck";
const App = () => {
  const isAuthChecked = useAuthCheck();

  return !isAuthChecked ? "Checking authentication" : <Wrapper />;
};

export default App;
