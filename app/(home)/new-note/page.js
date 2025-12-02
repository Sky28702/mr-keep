"use client";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function CreateNote() {
  return (
    <section className="p-4 relative">
      <h1 className="text-3xl font-semibold text-emerald-400 mb-4">
        Create New Note
      </h1>
      <form className=" flex flex-col item-center   ">
        <textarea
          placeholder="Title"
          className=" font-medium text-3xl min-h-[50px] max-h-[300px] w-full resize-none mb-6 outline-none overflow-hidden"
        ></textarea>

        <textarea
          placeholder="Take a note..."
          className="w-auto text-[20px]  h-auto outline-none"
        ></textarea>

        <button className="bg-emerald-400 text-white p-4 text-[20px] rounded-full fixed bottom-6 right-6">
          <IconDeviceFloppy stroke={2} />
        </button>
      </form>
    </section>
  );
}
