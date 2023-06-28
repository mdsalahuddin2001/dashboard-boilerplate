import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "../../features/theme/themeConfigSlice";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Login"));
  });
  const navigate = useNavigate();

  const submitForm = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://i.ibb.co/k3CJfMX/moduleverse-logo.png"
            alt="module verse"
          />
        </div>
        <h2 className="font-bold text-2xl mb-3">Sign In</h2>
        <p className="mb-7">Enter your email and password to login</p>
        <form className="space-y-5 pb-4" onSubmit={submitForm}>
          <div>
            <label htmlFor="email"> Email </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            SIGN IN
          </button>
          <p className="text-center">
            Already have an account ?
            <Link
              to="/auth/register"
              className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
