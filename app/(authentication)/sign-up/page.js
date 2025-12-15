"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Register() {
  useEffect(() => {
    const localData = localStorage.getItem("Current User");
    if (localData) {
      router.push("/");
    }
  }, []);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [authStatus, setAuthStatus] = useState();
  const [error, setError] = useState("");

  async function atSubmit(data) {
    try {
      const res = await axios.post("/backend/api/signup", data);

      setAuthStatus(res.data.success);

      setError(res.data.message);

      if (res.data.success) {
        router.push(`/sign-in`);
      }

      // res.data.success
      // res.data.message
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="p-1">
        <h1 className="font-bold text-3xl mt-2">Register</h1>
        <form onSubmit={handleSubmit(atSubmit)}>
          <div className="flex flex-col md:flex-row justify-between items-center md:mt-40 gap-4">
            <img
              src="/register.png"
              className=" h-70 w-80 mb-2  md:mt-0  mt-20"
            ></img>

            <div className="flex flex-col justify-center items-center gap-4  px-1">
              <div className="grid grid-cols-2 gap-2 ">
                <div>
                  <input
                    placeholder="First Name"
                    className=" w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline border  border-emerald-400  p-2 rounded-2xl  focus:outline-emerald-400"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 3,
                        message: "First name must be at least 3 characters",
                      },
                    })}
                  ></input>
                  {errors.firstName && (
                    <p className="text-red-600 mb-4 mt-4">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    placeholder="Last Name"
                    className=" w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline border  border-emerald-400  p-2 rounded-2xl  focus:outline-emerald-400"
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 3,
                        message: "Last name must be at least 3 characters",
                      },
                    })}
                  ></input>
                  {errors.lastName && (
                    <p className="text-red-600 mb-4 mt-4">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full">
                <input
                  placeholder="User Name"
                  className=" w-full  active:outline-emerald-400 active:outline-2 outline-none focus:outline  border  border-emerald-400  p-2 rounded-2xl focus:outline-emerald-400"
                  {...register("userName", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                ></input>
                {errors.userName && (
                  <p className="text-red-600 mb-4 mt-4">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <input
                  type="email"
                  placeholder="abc@email.com"
                  className=" w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline  border  border-emerald-400  p-2 rounded-2xl focus:outline-emerald-400"
                  {...register("email", {
                    required: "Email is required",
                  })}
                ></input>
                {errors.email && (
                  <p className="text-red-600 mb-4 mt-4">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className=" mb-4 w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline border  border-emerald-400  p-2 rounded-2xl  focus:outline-emerald-400"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                ></input>
                {errors.password && (
                  <p className="text-red-600 mb-4 mt-4">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <p className="font-normal">
                Already registerd?{" "}
                <Link className="text-emerald-400" href="/sign-in">
                  Login here
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
                Register{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
