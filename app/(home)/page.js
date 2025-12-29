"use client";
import { IconPlus, IconTrash, IconEdit, IconLogout } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CreateNote from "../components/NewNote";
import EditNotes from "../components/EditNote";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const router = useRouter();
  const [index, setIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [notes, setNotesData] = useState([]);
  const [user_Id, setUser_Id] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalTwoIsOpen, setModalTwoIsOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  async function readAllNotes(userId) {
    try {
      try {
        setLoading(true);

        const res = await axios.get(`/backend/api/notes?userId=${userId}`);

        setNotesData(res.data.notes);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Modal.setAppElement("body");

    const localData = localStorage.getItem("Current User");
    const user = JSON.parse(localData);

    if (!localData) {
      router.push("/sign-in");
      return;
    }
    setUser_Id(user.id);
    readAllNotes(user.id);
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openTwoModal(noteId) {
    setSelectedNoteId(noteId);
    setModalTwoIsOpen(true);
  }

  function closeTwoModal() {
    setModalTwoIsOpen(false);
    setSelectedNoteId(null);
  }

  function openDeleteModal(noteId) {
    setNoteToDelete(noteId);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
    setNoteToDelete(null);
  }

  async function confirmDelete() {
    if (!noteToDelete) return;
    await deletedNote(noteToDelete);

    closeDeleteModal();
  }

  function indexHandler(i) {
    setIndex(i);
  }

  async function deletedNote(noteId) {
    const res = await axios.delete(`/backend/api/notes?notesId=${noteId}`);
    console.log(res.data);
    toast.success("Successfully deleted!");
    readAllNotes(user_Id);
  }

  const handleLogout = () => {
    localStorage.removeItem("Current User");

    router.push("/sign-in");
  };

  return (
    <section className="m-auto relative p-2">
      <div>
        <Toaster />
      </div>
      <h1 className="font-bold text-3xl align-left mt-2 mb-4 flex flex-row items-center justify-between ">
        Mr-Keep
        <IconLogout
          stroke={2}
          size={30}
          onClick={handleLogout}
          title="logout"
          className="text-black cursor-pointer"
        />
      </h1>
      {loading == true || notes.length == 0 ? (
        <div className="flex flex-col items-center justify-center min-h-full text-center">
          {/* <img src="/write.png" className="h-120 mb-2 max-w-full min-w-[70%]" /> */}
          <img src="/write.png" className=" h-auto" />

          <p className="font-normal text-[22px]">Start Writing Your Notes</p>
        </div>
      ) : (
        notes.map((not, id) => (
          <div
            key={id}
            onClick={() => {
              openTwoModal(not._id);
              indexHandler(id);
            }}
            //  onClick={() => { func1(); func2(); }}
            className=" relative py-2 pr-4 pl-2 border border-none shadow shadow-emerald-400 cursor-pointer transition-shadow rounded-[10px] w-full mb-6 align-left h-40"
          >
            <p className="truncate mb-1 font-semibold text-2xl">{not.title} </p>
            <p className="line-clamp-3 overflow-hidden text-gray-800">
              {not.text}
            </p>

            <div
              className="absolute bottom-1 items-center right-2 flex flex-row gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-gray-700 font-light text-[12px] ">
                Last time editied : {not.updatedAt}
              </p>
              <IconTrash
                onClick={() => openDeleteModal(not._id)}
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
        className="bg-white rounded-2xl w-[90%] max-w-xl outline-none overflow-scroll max-h-[80%] overflow-y-scroll overflow-x-hidden"
        ariaHideApp={false}
      >
        <EditNotes
          noteId={selectedNoteId}
          closeModal={closeTwoModal}
          readAllNotes={readAllNotes}
          index={index}
          notes={notes}
        />
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        className="bg-white rounded-2xl w-[90%] max-w-xl max-h-[80%] outline-none overflow-y-scroll overflow-x-hidden"
        ariaHideApp={false}
      >
        <CreateNote closeModal={closeModal} readAllNotes={readAllNotes} />
      </Modal>

      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={closeDeleteModal}
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        className="bg-white rounded-2xl w-[90%] max-w-sm outline-none"
        ariaHideApp={false}
      >
        <div className="flex flex-col gap-4 p-6">
          <h2 className="text-lg font-semibold">Are you sure?</h2>
          <p className="text-sm text-gray-600">This can't be undone.</p>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={closeDeleteModal}
              className="px-4 py-2 border border-gray-300 cursor-pointer rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default Home;
