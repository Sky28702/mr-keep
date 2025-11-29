import { IconPlus } from "@tabler/icons-react";

function Home() {
  return (
    <section className=" relative flex justify-center items-center flex-col h-screen">
      {/* <img
        src="/write.png"
        className=" h-auto mb-2 max-w-full min-w-[70%] "
      ></img>
      <p className="font-normal text-[22px]">Start Writing Your Notes</p> */}
      <div className=" fixed bg-emerald-400 cursor-pointer bottom-6 right-6 rounded-full">
        <span className="font-2xl text-white">
          <IconPlus stroke={2} size={50} />
        </span>
      </div>
    </section>
  );
}

export default Home;
