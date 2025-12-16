"use client";
import {
  IconPlus,
  IconTrash,
  IconEdit,
  IconLoader2,
  IconCheck,
} from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notes, setNotesData] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    Modal.setAppElement("body");
    const localData = localStorage.getItem("Current User");
    const user = JSON.parse(localData);
    if (localData) {
      setUserId(user.id);
    } else {
      router.push("/sign-in");

      return;
    }

    async function readAllNotes() {
      try {
        try {
          setLoading(true);
          const res = await axios.get(`/backend/api/notes?userId=${user.id}`);
          setNotesData(res.data.notes);
        } finally {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    readAllNotes();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function atSubmit(data) {
    try {
      try {
        setLoading(true);
        const payload = {
          title: data.title,
          text: data.text,
          userId,
        };
        const res = await axios.post("/backend/api/notes", payload);
        console.log(res.data);
      } finally {
        reset();
        setLoading(false);

        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
    router.push(`/`);
  }

  return (
    <section className=" relative p-2">
      <h1 className="font-bold text-3xl align-left mt-2 mb-10">Mr-Keep</h1>
      {loading == true || notes.length == 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <img
            src="/write.png"
            className="h-auto mb-2 max-w-full min-w-[70%]"
          />
          <p className="font-normal text-[22px]">Start Writing Your Notes</p>
        </div>
      ) : (
        notes.map((not, id) => (
          <div
            key={id}
            className=" relative py-2 pr-4 pl-2 border border-none shadow shadow-emerald-400 cursor-pointer transition-shadow rounded-[10px] w-full mb-6 align-left h-40"
          >
            <p className="truncate mb-1 font-semibold text-2xl">{not.title} </p>
            <p className="line-clamp-3 overflow-hidden text-gray-800">
              {not.text}
            </p>

            <div className="absolute bottom-1 right-2 flex flex-row gap-2 items-center">
              <p className="text-gray-700  font-light text-[12px] ">
                Last time editied : 12:00Am, 12-20-2025
              </p>

              <p
                title="delete"
                className="cursor-pointer text-red-500 text-[18px]"
              >
                <IconTrash stroke={2} />
              </p>
              <p
                title="Edit"
                className="cursor-pointer text-emerald-400 text-[18px] "
              >
                <IconEdit stroke={2} />
              </p>
            </div>
          </div>
        ))
      )}

      <button onClick={openModal}>
        <div className=" fixed bg-emerald-400 cursor-pointer bottom-6 right-6 rounded-full">
          <span className="font-2xl text-white">
            <IconPlus stroke={2} size={50} />
          </span>
        </div>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        className="bg-white rounded-2xl w-[90%] max-w-xl outline-none"
        ariaHideApp={false}
      >
        <section className="p-6 relative">
          <div className="text-3xl font-semibold mb-4 flex justify-between items-center">
            <h1 className="text-emerald-400">Create New Note</h1>
          </div>

          <form onSubmit={handleSubmit(atSubmit)} className="flex flex-col">
            <textarea
              placeholder="Title"
              className="font-medium text-3xl min-h-[50px] resize-none mb-6 outline-none"
              maxLength={20}
              {...register("title")}
            />

            <textarea
              placeholder="Take a note..."
              className="text-[20px] outline-none resize-none mb-4"
              {...register("text", {
                required: "Enter your text",
                minLength: {
                  value: 2,
                  message: "Text mustn't be empty!",
                },
              })}
            />

            {errors.text && (
              <p className="text-red-600 mb-2">{errors.text.message}</p>
            )}

            <button
              disabled={loading}
              type="submit"
              className="bg-emerald-400 cursor-pointer text-white p-4 rounded-full self-end mt-4
             flex items-center justify-center"
            >
              {loading ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                <IconCheck />
              )}
            </button>
          </form>
        </section>
      </Modal>
    </section>
  );
}

export default Home;
