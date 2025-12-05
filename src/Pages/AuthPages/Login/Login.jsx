import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, singInUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    singInUser(data.email, data.password)
      .then((result) => {
        setUser(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="max-w-sm">
        <div className="mb-8">
          <h2 className="font-extrabold text-[42px]">Welcome Back</h2>
          <p>Login with ZapShift</p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset text-[16px]">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {/* Submit Button */}
            <div>
              <Link className="underline">Forget Password?</Link>
            </div>
            <button className="py-3 px-4 rounded-lg mt-4 text-[16px] bg-primary font-bold cursor-pointer">
              Login
            </button>

            {/* Go to register */}
            <div>
              <p>
                Don't have any account?
                <Link
                  state={location?.state}
                  className="text-primary font-bold"
                  to="/register"
                >
                  {" "}
                  Register
                </Link>
              </p>
            </div>
          </fieldset>
        </form>

        {/* Login With Google Button */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
