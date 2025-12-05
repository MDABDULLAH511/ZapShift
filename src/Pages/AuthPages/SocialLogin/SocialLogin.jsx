import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { setUser, signUpWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);

        //Create user
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        axiosSecure
          .post("/users", userInfo)
          .then((res) => {
            console.log("User data has been stored in the database", res.data);
            navigate(location.state || "/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="py-2">
        <p className="text-center font-bold">Or</p>
      </div>
      <div>
        <button
          onClick={handleSignInWithGoogle}
          className="py-3 px-4 rounded-lg mt-4 text-[16px] font-bold bg-gray-200 text-black border border-[#e5e5e5]  w-full flex justify-center items-center gap-5 hover:bg-gray-300 duration-400 cursor-pointer"
        >
          <FcGoogle />
          Login with google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
