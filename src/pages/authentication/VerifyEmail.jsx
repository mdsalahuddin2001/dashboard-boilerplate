import React, { useEffect } from "react";
import useQuery from "../../hooks/useQuery";
import { Link, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../../features/auth/authApi";
const VerifyEmail = () => {
  const [verifyEmail, { isLoading, isError, isSuccess }] =
    useVerifyEmailMutation();
  const query = useQuery();
  const token = query.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/auth/register");
    }
    verifyEmail({ token });
  }, [token]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center space-y-4 text-center">
        <img
          className="max-w-[400px] px-4 mx-auto !mb-8"
          src="/assets/images/bad.jpg"
          alt="welcome"
        />
        <p className="text-4xl">OOPS! Invalid token or token may be expired.</p>

        <Link to="/" className="btn btn-primary">
          Back To Home
        </Link>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center space-y-4 text-center">
        <img
          className="max-w-[400px] px-4 mx-auto !mb-8"
          src="/assets/images/welcome.svg"
          alt="welcome"
        />
        <p className="text-2xl">
          Congratulations! Thank You for connecting with us. Please Login to
          explore.
        </p>

        <Link to="/auth/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }
};

export default VerifyEmail;
