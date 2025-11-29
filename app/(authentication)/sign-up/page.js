function Register() {
  return (
    <>
      <div>
        <form>
          <div className="flex flex-col md:flex-row justify-between items-center md:mt-40 gap-4">
            <img
              src="/register.png"
              className=" h-70 w-80 mb-2  md:mt-0  mt-20"
            ></img>
            <div className="flex flex-col justify-center items-center gap-4  px-1">
              <div className="grid grid-cols-2 gap-2 ">
                <input
                  placeholder="First Name"
                  className=" w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline border  border-emerald-400  p-2 rounded-2xl  focus:outline-emerald-400"
                ></input>

                <input
                  placeholder="Last Name"
                  className=" w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline border  border-emerald-400  p-2 rounded-2xl  focus:outline-emerald-400"
                ></input>
              </div>
              <input
                placeholder="User Name"
                className=" w-full  active:outline-emerald-400 active:outline-2 outline-none focus:outline  border  border-emerald-400  p-2 rounded-2xl focus:outline-emerald-400"
              ></input>
              <input
                placeholder="abc@email.com"
                className=" w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline  border  border-emerald-400  p-2 rounded-2xl focus:outline-emerald-400"
              ></input>

              <input
                placeholder="Password"
                className=" mb-4 w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline border  border-emerald-400  p-2 rounded-2xl  focus:outline-emerald-400"
              ></input>
              <p className="font-normal mb-4">
                Already registerd?{" "}
                <span className="text-emerald-400">Login here</span>
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
