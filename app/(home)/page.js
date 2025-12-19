"use client";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CreateNote from "../components/NewNote";
import EditNotes from "../components/EditNote";

function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [notes, setNotesData] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalTwoIsOpen, setModalTwoIsOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

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

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openTwoModal(noteId) {
    setSelectedNoteId(noteId); // set the note to edit
    setModalTwoIsOpen(true);
  }

  function closeTwoModal() {
    setModalTwoIsOpen(false);
    setSelectedNoteId(null); // reset selected note
  }

  function example() {
    alert(`heaven`);
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
            onClick={() => openTwoModal(not._id)}
            className=" relative py-2 pr-4 pl-2 border border-none shadow shadow-emerald-400 cursor-pointer transition-shadow rounded-[10px] w-full mb-6 align-left h-40"
          >
            <p className="truncate mb-1 font-semibold text-2xl">{not.title} </p>
            <p className="line-clamp-3 overflow-hidden text-gray-800">
              {not.text}
            </p>

            <div className="absolute bottom-1 items-center right-2 flex flex-row gap-2  ">
              <p className="text-gray-700 font-light text-[12px] ">
                Last time editied : {not.updatedAt}
              </p>

              <IconTrash
                stroke={2}
                title="delete"
                className="cursor-pointer text-red-500 text-[18px] hover:animate-bounce"
              />
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
        isOpen={modalTwoIsOpen}
        onRequestClose={closeTwoModal}
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        className="bg-white rounded-2xl w-[90%] max-w-xl outline-none"
        ariaHideApp={false}
      >
        <EditNotes noteId={selectedNoteId} closeModal={closeTwoModal} />
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        className="bg-white rounded-2xl w-[90%] max-w-xl outline-none"
        ariaHideApp={false}
      >
        <CreateNote closeModal={closeModal} />
      </Modal>
    </section>
  );
}

export default Home;
