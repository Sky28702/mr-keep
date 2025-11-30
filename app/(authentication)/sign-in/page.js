"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [authStatus, setAuthStatus] = useState();
  const [error, setError] = useState("");

  async function atSubmit(data) {
    try {
      const res = await axios.post("/backend/api/signin", data);
      setAuthStatus(res.data.success);

      setError(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="p-1">
      <h1 className="font-bold text-3xl mt-2">Login</h1>
      <form onSubmit={handleSubmit(atSubmit)}>
        <div className="flex flex-col md:flex-row justify-between items-center md:mt-40 p-1">
          <img
            src="/logIn.png"
            className=" h-70 w-90 mb-2  md:mt-0  mt-20"
          ></img>
          <div className="flex flex-col justify-center items-center gap-4  w-full md:w-100 ">
            <div className="w-full">
              <input
                placeholder="User Name"
                className=" min-w-full  active:outline-emerald-400 active:outline-2 outline-none focus:outline  border  border-emerald-400  p-2 rounded-2xl focus:outline-emerald-400"
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              ></input>
              {errors.userName && (
                <p className="text-red-600 mb-2 mt-2">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <input
                placeholder="Password"
                className=" mb-4 min-w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline border  border-emerald-400  p-2 rounded-2xl  focus:outline-emerald-400"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              ></input>
              {errors.password && (
                <p className="text-red-600 mb-2 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <p className="font-normal  ">
              New Here?{" "}
              <Link href="/sign-up" className="text-emerald-400">
                Register Now
              </Link>
            </p>

            <p
              className={`  text-[16px] font-light ${
                authStatus == true ? "text-green-500" : "text-red-500"
              } `}
            >
              {" "}
              {error}{" "}
            </p>

            <button className="bg-emerald-400 hover:bg-emerald-300 cursor-pointer px-4 py-2 rounded-[10px] text-white text-[20px]  ">
              {" "}
              Login{" "}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default login;
