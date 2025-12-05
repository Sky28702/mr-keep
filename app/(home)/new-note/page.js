"use client";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState } from "react";

export default function CreateNote() {
  const [height, setHeight] = useState(50);

  // if(sizeof)

  return (
    <section className="p-4 relative">
      <h1 className="text-3xl font-semibold text-emerald-400 mb-4">
        Create New Note
      </h1>
      <form className=" flex flex-col item-center   ">
        <textarea
          placeholder="Title"
          className=" font-medium field-sizing-content text-3xl min-h-[50px] max-h-[300px] w-full resize-none mb-6 outline-none overflow-hidden"
          maxLength={20}
        ></textarea>

        <textarea
          placeholder="Take a note..."
          className="w-auto text-[20px] field-sizing-content h-screen outline-none"
          maxLength={200}
        ></textarea>

        <button className="bg-emerald-400 text-white p-4 cursor-pointer text-[20px] rounded-full fixed bottom-6 right-6">
          <IconDeviceFloppy stroke={2} />
        </button>
      </form>
    </section>
  );
}
