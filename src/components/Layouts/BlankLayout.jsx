import React from "react";
import App from "../../App";
import Wrapper from "../../Wrapper";

const BlankLayout = ({ children }) => {
  return (
    <Wrapper>
      <div className="text-black dark:text-white-dark min-h-screen">
        {children}{" "}
      </div>
    </Wrapper>
  );
};

export default BlankLayout;
