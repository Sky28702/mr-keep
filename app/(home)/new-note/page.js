"use client";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";

export default function CreateNote() {
  const router = useRouter();
  useEffect(() => {
    const localData = localStorage.getItem("Current User");
    if (localData) {
      const user = JSON.parse(localData);
    } else {
      router.push("/sign-up");

      return;
    }

    // async function statusOfLike() {git statuss

    //   try {
    //     setLoading(true);
    //     await statusLike(data, setIssClick);
    //   } finally {
    //     setLoading(false);
    //   }
    // }

    // statusOfLike();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function atSubmit(data) {
    try {
      try {
        setLoading(true);
        const res = await axios.post("/backend/api/notes", data);
        console.log(res.data);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="p-4 relative">
      <h1 className="text-3xl font-semibold text-emerald-400 mb-4">
        Create New Note
      </h1>
      <form
        onSubmit={handleSubmit(atSubmit)}
        className=" flex flex-col item-center   "
      >
        <textarea
          placeholder="Title"
          className=" font-medium field-sizing-content text-3xl min-h-[50px] max-h-[300px] w-full resize-none mb-6 outline-none overflow-hidden"
          maxLength={20}
          {...register("title")}
        ></textarea>

        <textarea
          placeholder="Take a note..."
          className="w-auto text-[20px] field-sizing-content h-screen outline-none"
          {...register("text")}
        ></textarea>

        <button
          disabled={loading}
          className="bg-emerald-400 text-white p-4 cursor-pointer text-[20px] rounded-full fixed bottom-6 right-6"
        >
          {loading == true ? (
            <span className="animate-spin">
              <IconLoader2 stroke={2} />
            </span>
          ) : (
            <IconDeviceFloppy stroke={2} />
          )}
        </button>
      </form>
    </section>
  );
}
