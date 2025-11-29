import Link from "next/link";
function login() {
  return (
    <section className="p-1">
      <h1 className="font-bold text-3xl mt-2">Login</h1>
      <form>
        <div className="flex flex-col md:flex-row justify-between items-center md:mt-40 p-1">
          <img
            src="/logIn.png"
            className=" h-70 w-90 mb-2  md:mt-0  mt-20"
          ></img>
          <div className="flex flex-col justify-center items-center gap-4  w-full md:w-100 ">
            <input
              placeholder="User Name"
              className=" min-w-full  active:outline-emerald-400 active:outline-2 outline-none focus:outline  border  border-emerald-400  p-2 rounded-2xl focus:outline-emerald-400"
            ></input>

            <input
              placeholder="Password"
              className=" mb-4 min-w-full active:outline-emerald-400 active:outline-2 outline-none focus:outline border  border-emerald-400  p-2 rounded-2xl  focus:outline-emerald-400"
            ></input>
            <p className="font-normal mb-4">
              New Here?{" "}
              <Link href="/sign-up" className="text-emerald-400">
                Register Now
              </Link>
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
