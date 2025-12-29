"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";

export default function EditNotes({
  noteId,
  closeModal,
  readAllNotes,
  index,
  notes,
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [userId, setUser_Id] = useState(null);

  useEffect(() => {
    const localData = localStorage.getItem("Current User");
    const user = JSON.parse(localData);
    if (!localData) {
      router.push("/sign-in");
      return;
    }

    setUser_Id(user.id);

    if (!noteId) return;

    reset({
      title: notes[index].title,
      text: notes[index].text,
    });
  }, [noteId, reset, router]);

  const [loading, setLoading] = useState(false);

  async function atSubmit(data) {
    try {
      setLoading(true);

      const res = await axios.put(`/backend/api/notes?notesId=${noteId}`, data);
      console.log(res.data);
      setLoading(false);
      closeModal();
    } catch (error) {
      console.error(error);
    }
    readAllNotes(userId);
  }

  return (
    <section className="p-4 relative">
      <div className="text-3xl font-semibold mb-4  flex flex-row items-center justify-between">
        <h1 className=" text-emerald-400"> Edit </h1>
      </div>
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
          className="w-auto text-[20px] field-sizing-content resize-none outline-none"
          {...register("text", {
            required: "Enter your text",
            minLength: {
              value: 2,
              message: "Text musn't be empty! ",
            },
          })}
        ></textarea>

        {errors.text && (
          <p className="text-red-600 mb-2 mt-2">{errors.text.message}</p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="bg-emerald-400 cursor-pointer text-white p-4 rounded-full self-end mt-4
                  flex items-center justify-center"
        >
          {loading ? <IconLoader2 className="animate-spin" /> : <IconCheck />}
        </button>
      </form>
    </section>
  );
}
