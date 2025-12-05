import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `https://zap-shift-server-mocha-eight.vercel.app`,
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //Intercept request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      }
    );

    //interceptor response
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // console.log(error.status);

        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
