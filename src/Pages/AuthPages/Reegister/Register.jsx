import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    const profileImage = data.photo && data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        //store the image and get the pgoto url
        const formData = new FormData();
        formData.append("image", profileImage);
        const imageAPIURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(imageAPIURL, formData).then((res) => {
          const photoURL = res.data.data.url;

          //create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure
            .post("/users", userInfo)
            .then((res) => {
              if (res.data.insertedId) {
                console.log("User created in the database");
              }
            })
            .catch((err) => {
              console.log(err);
            });

          //Update User Profile here
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then((result) => {
              navigate(location.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="max-w-sm">
        <div className="mb-8">
          <h2 className="font-extrabold text-[42px]">Create an Account</h2>
          <p>Register with ZapShift</p>
        </div>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset text-[16px]">
            {/* Image */}
            <label className="label">Image</label>
            <input
              type="file"
              {...register("photo")}
              className="file-input w-full"
              placeholder="photo"
            />

            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name")}
              className="input w-full"
              placeholder="Name"
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">Email Is Required</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\;:'",.<>/?`~]).{6,}$/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type == "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                {" "}
                Password must include uppercase, lowercase, number & special
                character (min 6 chars)
              </p>
            )}

            <button className="py-3 px-4 rounded-lg mt-4 text-[16px] bg-primary font-bold cursor-pointer">
              Register
            </button>

            <div>
              <p>
                Already have an account?
                <Link
                  state={location.state}
                  className="text-primary font-bold"
                  to="/login"
                >
                  {" "}
                  Login
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

export default Register;
