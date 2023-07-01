import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyEmailMessage = () => {
  const { registrationInfo } = useSelector((state) => state.auth);

  //
  const navigate = useNavigate();

  useEffect(() => {
    if (!registrationInfo) {
      navigate("/auth/register");
    }
  }, [registrationInfo]);
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-4 text-center">
      <img
        className="max-w-[400px] px-4 mx-auto !mb-8"
        src="/assets/images/verify-email.svg"
        alt="welcome"
      />
      <p className="text-2xl">
        Please check your email and verify to complete the registration.
      </p>
      <p>Didn't receive any email ?</p>
      <button className="btn btn-primary">Resend email</button>
    </div>
  );
};

export default VerifyEmailMessage;
